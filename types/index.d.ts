
 interface optionsType{ 
    email:String,
    subject:String
    message:String,
}


 interface mailOptionsType{ 
    from: String,
    to:String,
    subject:String,
    text: String
}



declare type contextParams = {
    params:{ 
            userid:string,
            email:string
    }

}

declare type contextRoom = { 
    params:{ 
        roomId:string,
        userId:string
    }
   
}


declare interface friendArrayInf{ 
email:string
emailId:string
firstName:string
invitedBy:string
lastName :string
photo:string
__v:number
_id:string
}


interface roomProps {
    params: {
      roomId: string,
      userId:string
    }
  }

interface onlyRoomType{ 
    params:{
        userId:string
    } 
}
