<?php

namespace Tests\Feature;

use App\Models\Ticket;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TicketApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_ticket_can_be_created_and_loaded_from_the_api(): void
    {
        $response = $this->postJson('/api/tickets', [
            'requester_name' => 'Impas',
            'requester_email' => 'jaymart@gmail.com',
            'issue_category' => 'Hardware',
            'priority' => 'Medium',
            'subject' => 'Computer issue',
            'description' => 'The computer will not start.',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('ticket_number', 'TCK-00001')
            ->assertJsonPath('status', 'Open');

        $ticketId = $response->json('id');

        $this->assertDatabaseHas('tickets', [
            'id' => $ticketId,
            'requester_email' => 'jaymart@gmail.com',
        ]);

        $this->getJson("/api/tickets/{$ticketId}")
            ->assertOk()
            ->assertJsonPath('subject', 'Computer issue');

        $this->getJson('/api/tickets')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.id', $ticketId);
    }
}
