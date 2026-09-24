package caiodev2.form.api.backend.repositories;

import caiodev2.form.api.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
