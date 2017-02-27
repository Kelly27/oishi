<?php
namespace App\Mailers;

use App\ContactUs;
use Illuminate\Contracts\Mail\Mailer;

class AppMailer {
    protected $mailer;
    protected $fromAddress = 'oishi@oishi.dev';
    protected $fromName = 'Oishi Restaurant';
    protected $to;
    protected $subject;
    protected $view;
    protected $data = [];

    public function __construct(Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendTicketInformation(ContactUs $contactus)
    {
        $this->to = $contactus->email;
        $this->subject = "
            Name: $contactus->name,
            Email: $contactus->email,
            Subject: $contactus->subject,
            Message: $contactus->message
            ";
        $this->view = 'emails.contact_us';
        $this->data = compact('contactus');

        return $this->deliver();
    }

    public function deliver()
    {
        $this->mailer->send($this->view, $this->data, function($message) {
            $message->from($this->fromAddress, $this->fromName)
                    ->to($this->to)->subject($this->subject);
        });
    }
}