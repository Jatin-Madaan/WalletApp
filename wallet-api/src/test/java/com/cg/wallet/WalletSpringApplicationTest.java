package com.cg.wallet;

import static org.junit.Assert.assertEquals;

import java.sql.Timestamp;
import java.util.Date;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.cg.wallet.exception.UserAlreadyExistsException;
import com.cg.wallet.exception.UserNotFoundException;
import com.cg.wallet.model.Transaction;
import com.cg.wallet.model.User;
import com.cg.wallet.service.TransactionService;
import com.cg.wallet.service.UserService;

@RunWith(SpringRunner.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@SpringBootTest
public class WalletSpringApplicationTest {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TransactionService transactionService;
	
	static User user;
	static Transaction transaction;
	
	//Adding Customer
	
	@Test
	public void testA() throws UserAlreadyExistsException {
		user = new User("Jonit", "Jonita@gmail.com", "pass1234");
		assertEquals(user, userService.addUser(user));
	}

	
	//Get User By Id
	@Test
	public void testB() {
		assertEquals(true, userService.getUserById(user.getUserId()) != null);
	}
	
	//Update User 
	@Test
	public void testC() {
		user.setUserName("YoYO");
		user.setUserBalance(25600);
		assertEquals(true, userService.updateUser(user)!= null);
	}
	
	//getUserByEmail id
	@Test
	public void testD() throws UserNotFoundException {
		assertEquals(true, userService.getUserByEmailId(user.getUserEmailId()) != null);
	}
	
	//getAllUsers
	@Test
	public void testE() {
		assertEquals(false, userService.getAllUser().isEmpty());
	}
	
	
	//add transaction
	@Test
	public void testF() {
		transaction = new Transaction();
		transaction.setTransactionAmount(1000);
		transaction.setTransactionType("deposit");
		transaction.setTransactionTime(new Timestamp(new Date().getTime()));
		transaction.setUserId(user.getUserId());
		transaction.setBeneficiaryId(user.getUserId());
		assertEquals(true, transactionService.addTransaction(transaction) != null);
	}
	//list Transactions
	@Test
	public void testG() {
		assertEquals(false, transactionService.getTransactionList(user.getUserId()).isEmpty());
	}
	
	@Test
	public void testI() {
		assertEquals(true, transactionService.getTransactionById(transaction.getTransactionId()) != null);
	}
	
	//User already Exists Exeption
	@Test(expected = UserAlreadyExistsException.class)
	public void testJ() throws UserAlreadyExistsException {
		user = new User("Jonit", "Jonita@gmail.com", "pass1234");
		assertEquals(user, userService.addUser(user));
	}
	
	@Test(expected = UserNotFoundException.class)
	public void testK() throws UserNotFoundException {
		assertEquals(true, !userService.getUserByEmailId("xyz@email.com").isEmpty());
	}
}
