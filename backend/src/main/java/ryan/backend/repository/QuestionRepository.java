package ryan.backend.repository;

import ryan.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByType(Question.QuestionType type);
    
    @Query("SELECT q FROM Question q WHERE q.type = ?1 ORDER BY RAND() LIMIT ?2")
    List<Question> findRandomQuestionsByType(Question.QuestionType type, int limit);
    
    @Query("SELECT q FROM Question q WHERE q.content LIKE %?1%")
    List<Question> searchByContent(String content);
    
    @Modifying
    @Query("UPDATE Question q SET q.content = ?2 WHERE q.id = ?1")
    int updateQuestionContent(Long id, String content);
    
    @Modifying
    @Query("DELETE FROM Question q WHERE q.id = ?1")
    void deleteQuestionById(Long id);
}