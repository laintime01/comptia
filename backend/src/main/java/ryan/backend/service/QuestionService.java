package ryan.backend.service;

import ryan.backend.model.Question;
import ryan.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> getQuestionsByType(Question.QuestionType type) {
        return questionRepository.findByType(type);
    }

    public List<Question> getRandomQuestions(Question.QuestionType type, int count) {
        return questionRepository.findRandomQuestionsByType(type, count);
    }

    @Transactional
    public Question updateQuestion(Question question) {
        if (questionRepository.existsById(question.getId())) {
            return questionRepository.save(question);
        } else {
            throw new RuntimeException("Question not found");
        }
    }

    @Transactional
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public List<Question> searchQuestions(String content) {
        return questionRepository.searchByContent(content);
    }

    @Transactional
    public int updateQuestionContent(Long id, String content) {
        return questionRepository.updateQuestionContent(id, content);
    }
}