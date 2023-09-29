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
                Credentials = new NetworkCredential("burkemailsender@gmail.com", "*******"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("burkemailsender@gmail.com"),
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(email);

            smtpClient.Send(mailMessage);
        }

    }
}
