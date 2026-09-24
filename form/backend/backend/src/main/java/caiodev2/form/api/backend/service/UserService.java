package caiodev2.form.api.backend.service;

import caiodev2.form.api.backend.entities.User;
import caiodev2.form.api.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user){

        return userRepository.save(user);
    }
}
