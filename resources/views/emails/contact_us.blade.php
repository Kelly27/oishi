<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Suppor Ticket Information</title>
</head>
<body>
    <p>
        Thank you {{ $contactus->name }} for contacting our support team. We will keep in touch with you as soon as possible. The details of your message are shown below:
    </p>

    <p>Name: {{ $contactus->name }}</p>
    <p>Email: {{ $contactus->email }}</p>
    <p>Phone: {{ $contactus->phone }}</p>
    <p>Message: {{ $contactus->message }}</p>

</body>
</html>