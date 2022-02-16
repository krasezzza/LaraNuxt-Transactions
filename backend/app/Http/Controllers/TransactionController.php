<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\Collection;

class TransactionController extends Controller
{
    /**
     * Get a single transaction.
     *
     * @param Integer $id
     */
    public function getOne($id)
    {
        return Transaction::findOrFail($id);
    }

    /**
     * Collect a listing of transactions.
     *
     * @return Collection|Transaction[]
     */
    public function listAll()
    {
        return Transaction::all();
    }

    /**
     * Store a newly created transaction.
     *
     * @param Request $request
     */
    public function create(Request $request)
    {
        $request->validate([
            'sender' => 'required',
            'receiver' => 'required',
            'amount' => 'required'
        ]);

        return Transaction::create($request->all());
    }

    /**
     * Update an already created transaction.
     *
     * @param Request $request
     * @param Integer $id
     */
    public function update(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);

        $transaction->update($request->all());

        return $transaction;
    }

    /**
     * Delete an already created transaction.
     *
     * @param Integer $id
     */
    public function delete($id)
    {
        return Transaction::destroy($id);
    }
}
