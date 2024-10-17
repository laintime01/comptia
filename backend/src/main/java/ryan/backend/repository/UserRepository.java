package ryan.backend.repository;

import ryan.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    List<User> findByRolesContaining(String role);

    @Modifying
    @Query("UPDATE User u SET u.email = ?2 WHERE u.id = ?1")
    int updateUserEmail(Long id, String email);

    @Modifying
    @Query("UPDATE User u SET u.password = ?2 WHERE u.id = ?1")
    int updateUserPassword(Long id, String password);

    @Query("SELECT u FROM User u WHERE u.username LIKE %?1%")
    List<User> searchByUsername(String username);

    @Modifying
    @Query("DELETE FROM User u WHERE u.id = ?1")
    void deleteUserById(Long id);
}