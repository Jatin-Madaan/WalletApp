package com.cg.wallet.service;

import java.util.List;

import com.cg.wallet.model.User;

public interface IUserService {
	
	List<User> getAllUser();
	User getUserById(long userId);
	User addUser(User user);
	User updateUser(User user);
	List<User> getUserByEmailId(String emailId);
}
