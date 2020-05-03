package com.cg.wallet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.wallet.dao.IUserDAO;
import com.cg.wallet.model.User;

@Service
public class UserService implements IUserService{

	@Autowired
	private IUserDAO daoRef;
	
	@Override
	public List<User> getAllUser() {
		return daoRef.findAll();
	}

	@Override
	public User getUserById(long userId) {
		return daoRef.getOne(userId);
	}

	@Override
	public User addUser(User user) {
		return daoRef.save(user);
	}

	@Override
	public User updateUser(User user) {
		return daoRef.save(user);
	}

	@Override
	public List<User> getUserByEmailId(String emailId) {
		return daoRef.findByUserEmailId(emailId);
	}

}
