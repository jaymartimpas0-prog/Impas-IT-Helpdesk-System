<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'requester_name',
        'requester_email',
        'issue_category',
        'priority',
        'subject',
        'description',
        'status',
    ];
}