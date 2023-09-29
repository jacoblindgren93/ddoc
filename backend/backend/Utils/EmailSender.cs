using System.Net.Mail;
using System.Net;

namespace backend.Utils
{
    public static class EmailSender
    {   

        public static void Send(string email, string subject, string body)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("burkemailsender@gmail.com", "yfsu wyot fknh gnhu"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("burkemailsender@gmail.com"),
                Subject = "Verify your account!",
                Body = "<h1>Hello</h1>",
                IsBodyHtml = true,
            };
            mailMessage.To.Add(email);

            smtpClient.Send(mailMessage);
        }

    }
}
