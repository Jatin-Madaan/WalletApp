package com.cg.wallet.service;

import java.util.List;

import com.cg.wallet.model.Transaction;

public interface ITransactionService {
	
	List<Transaction> getTransactionList(long userId);
	Transaction addTransaction(Transaction trans);
	Transaction getTransactionById(long transactionId);
}
