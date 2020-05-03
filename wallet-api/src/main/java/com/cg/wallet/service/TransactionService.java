package com.cg.wallet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.wallet.dao.ITransactionDAO;
import com.cg.wallet.model.Transaction;

@Service
public class TransactionService implements ITransactionService{

	@Autowired
	private ITransactionDAO daoRef;
	
	@Override
	public List<Transaction> getTransactionList(long userId) {
		return daoRef.findByUserUserId(userId);
	}

	@Override
	public Transaction addTransaction(Transaction trans) {
		return daoRef.save(trans);
	}

	@Override
	public Transaction getTransactionById(long transactionId) {
		return daoRef.getOne(transactionId);
	}

}
