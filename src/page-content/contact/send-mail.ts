import Mailjet from 'node-mailjet';

export async function sendMail(searchParams: URLSearchParams) {
    const mailjet = new Mailjet({
        apiKey: import.meta.env.MAILJET_API_KEY,
        apiSecret: import.meta.env.MAILJET_SECRET_KEY
      });
      try {
        await mailjet
          .post('send', { version: 'v3.1'})
          .request({
            Messages: [
              {
                From: {
                  Email: "martin.zachoszcz@gmail.com",
                  Name: `${searchParams.get('name')} (${searchParams.get('email')})`
                },
                To: [
                  {
                    Email: "martin.zachoszcz@gmail.com",
                    Name: "Martin Zachoszcz"
                  }
                ],
                Subject: searchParams.get('subject'),
                TextPart: searchParams.get('message')
              }
            ]
        })
        return true;
      } catch(e) {
        console.log(e);
        return false;
      }
}