package ryan.backend.service;

import ryan.backend.model.User;
import ryan.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken!");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already in use!");
        }
        // 设置默认角色，例如 "USER"
        user.addRole("USER");
        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        existingUser.setEmail(user.getEmail());
        // 只有在提供新密码时才更新密码
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(user.getPassword());
        }
        existingUser.setRoles(user.getRoles());
        
        return userRepository.save(existingUser);
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRolesContaining(role);
    }

    @Transactional
    public int updateUserEmail(Long id, String email) {
        return userRepository.updateUserEmail(id, email);
    }

    @Transactional
    public int updateUserPassword(Long id, String password) {
        return userRepository.updateUserPassword(id, password);
    }

    public List<User> searchUsersByUsername(String username) {
        return userRepository.searchByUsername(username);
    }

    @Transactional
    public void addRoleToUser(Long userId, String role) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.addRole(role);
        userRepository.save(user);
    }

    @Transactional
    public void removeRoleFromUser(Long userId, String role) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Set<String> roles = user.getRoles();
        roles.remove(role);
        user.setRoles(roles);
        userRepository.save(user);
    }
}