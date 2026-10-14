<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    // Get all tickets, with the latest first
    public function index()
    {
        return response()->json(
            Ticket::orderByDesc('created_at')->get()
        );
    }

    // Save a new ticket
    public function store(Request $request)
    {
        $data = $request->validate([
            'requester_name' => 'required|string|max:255',
            'requester_email' => 'required|email|max:255',
            'issue_category' => 'required|string|max:100',
            'priority' => 'required|in:Low,Medium,High,Critical',
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $ticket = Ticket::create($data);

        // Generate a readable ticket number using the database ID
        $ticket->ticket_number = 'TCK-' .
            str_pad((string) $ticket->id, 5, '0', STR_PAD_LEFT);

        $ticket->save();
        $ticket->refresh();

        return response()->json($ticket, 201);
    }

    // Get one ticket
    public function show(Ticket $ticket)
    {
        return response()->json($ticket);
    }

    // Update an existing ticket
    public function update(Request $request, Ticket $ticket)
    {
        $data = $request->validate([
            'requester_name' => 'sometimes|required|string|max:255',
            'requester_email' => 'sometimes|required|email|max:255',
            'issue_category' => 'sometimes|required|string|max:100',
            'priority' => 'sometimes|required|in:Low,Medium,High,Critical',
            'subject' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:Open,In Progress,Resolved,Closed',
        ]);

        $ticket->update($data);

        return response()->json($ticket);
    }

    // Delete a ticket
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json([
            'message' => 'Ticket deleted successfully.',
        ]);
    }
}