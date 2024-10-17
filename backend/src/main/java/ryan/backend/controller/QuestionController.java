package ryan.backend.controller;

import ryan.backend.model.Question;
import ryan.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question) {
        return ResponseEntity.ok(questionService.createQuestion(question));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        return questionService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/type/{type}")
    public List<Question> getQuestionsByType(@PathVariable Question.QuestionType type) {
        return questionService.getQuestionsByType(type);
    }

    @GetMapping("/random")
    public List<Question> getRandomQuestions(@RequestParam Question.QuestionType type, @RequestParam int count) {
        return questionService.getRandomQuestions(type, count);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @Valid @RequestBody Question question) {
        question.setId(id);
        try {
            return ResponseEntity.ok(questionService.updateQuestion(question));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<Question> searchQuestions(@RequestParam String content) {
        return questionService.searchQuestions(content);
    }
}