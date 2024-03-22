import nodeMailer from "nodemailer"
import { Options } from "nodemailer/lib/mailer";



export function ErrorHandler(error:unknown){ 
    //native JavaScript error (e.g., TypeError, RangeError)
    if(error  instanceof Error)
    { 
        console.error(error.message);
        throw new Error(`Error: ${error.message}`);
    }
    else if(typeof error ==='string')
    {
        console.error(error);
    }
    else{ 
        console.error(error);
        throw new Error(`Unknown error: ${JSON.stringify(error)}`);
    }
}




const sendEmail = async (options:optionsType) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST ,
    port: Number(process.env.SMTP_PORT),
    secure:true,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  if(!process.env.SMTP_MAIL)
  { 
    throw new Error('SMTP_MAIL environment variable is not set.');
    return;
  }
  const mailOptions:Options = {
    from:process.env.SMTP_MAIL,
    to: options.email as string,
    subject: options.subject as string,
    text: options.message as string,
  };

 const response= await transporter.sendMail(mailOptions);
 return response;
};

export default sendEmail;
