import connectDB from "@/lib/database/mongoose";
import Message from "@/lib/database/models/message.model";
import User from "@/lib/database/models/user.model";
import RoomId from "@/lib/database/models/roomId.model";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Lock } from "@upstash/lock";
import { Redis } from "@upstash/redis";


//while testing with two browsers we face race condition i.e two users creating roomId at same time of same sender and receiverId
async function fixRaceCondition(receiverId:string) {
  const lock = new Lock({
    id:nanoid(), // Unique lock ID
    lease: 5000, // Hold the lock for 5 seconds
    redis: Redis.fromEnv(),
  });

  if (await lock.acquire()) {
    // Inside critical section

  
    try {
      await connectDB();
      const { userId } = auth();

      const { _id } = await User.findOne({ clerkId: userId });

      if (!_id) {
        return NextResponse.json(
          { success: false, mssg: "User not found. Please log in." },
          { status: 500 }
        );
      }

      const senderId = _id.toString();

      if (!receiverId) {
        return NextResponse.json(
          { success: false, mssg: "Receiver ID is missing." },
          { status: 500 }
        );
      }
      const checkIfRoomIdExistsBetweenTwoUsers = await RoomId.findOne({
        senderId: receiverId,
        receiverId: senderId,
      });

      if (!checkIfRoomIdExistsBetweenTwoUsers) {
        const roomId = nanoid();
       
        await RoomId.create({ 
            senderId,
            receiverId,
            roomId
        })
        
        return NextResponse.json(
          { success: true, mssg: roomId },
          { status: 200 }
        );
      }

      const { roomId } = checkIfRoomIdExistsBetweenTwoUsers;
      console.log("Existing roomId:", roomId);
      return NextResponse.json(
        { success: true, mssg: roomId },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { success: false, mssg: "An error occurred." },
        { status: 500 }
      );
    } finally {
      await lock.release();
    }
  } else {
    console.log("Lock not acquired. Retrying...");
    await fixRaceCondition(receiverId); // Retry the operation
  }
}

export async function GET(req: NextRequest, context: onlyRoomType) {

    let receiverId = context.params.userId;
  return await fixRaceCondition(receiverId);
}
