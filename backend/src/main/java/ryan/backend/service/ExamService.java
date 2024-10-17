package ryan.backend.service;

import ryan.backend.model.Exam;
import ryan.backend.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Optional<Exam> getExamById(Long id) {
        return examRepository.findById(id);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public List<Exam> searchExams(String title) {
        return examRepository.findByTitleContaining(title);
    }

    @Transactional
    public Exam updateExam(Exam exam) {
        if (examRepository.existsById(exam.getId())) {
            return examRepository.save(exam);
        } else {
            throw new RuntimeException("Exam not found");
        }
    }

    @Transactional
    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }
}