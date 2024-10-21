import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';


// 模拟题目数据
const mockQuestions = [
  {
    id: 1,
    question: "Which of the following is a type of RAM that retains its contents when the power is turned off?",
    options: ["SRAM", "DRAM", "SDRAM", "NVRAM"],
    correctAnswer: "NVRAM"
  },
  {
    id: 2,
    question: "What is the default subnet mask for a Class C IP address?",
    options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
    correctAnswer: "255.255.255.0"
  },
  {
    id: 3,
    question: "Which port number is typically used for HTTP traffic?",
    options: ["21", "23", "80", "443"],
    correctAnswer: "80"
  },
  {
    id: 4,
    question: "What does BIOS stand for?",
    options: ["Basic Input/Output System", "Binary Input/Output System", "Basic Internet Operating System", "Broadband Input/Output Service"],
    correctAnswer: "Basic Input/Output System"
  },
  {
    id: 5,
    question: "Which of the following is not a valid IP address?",
    options: ["192.168.1.1", "10.0.0.1", "172.16.0.1", "256.1.1.1"],
    correctAnswer: "256.1.1.1"
  },
  {
    id: 6,
    question: "What is the purpose of a UPS in a computer system?",
    options: ["To increase processing speed", "To provide temporary power during outages", "To enhance graphics performance", "To improve network connectivity"],
    correctAnswer: "To provide temporary power during outages"
  },
  {
    id: 7,
    question: "Which of the following is a volatile type of memory?",
    options: ["ROM", "EEPROM", "RAM", "Flash memory"],
    correctAnswer: "RAM"
  },
  {
    id: 8,
    question: "What does RAID 1 provide?",
    options: ["Striping", "Mirroring", "Parity", "Concatenation"],
    correctAnswer: "Mirroring"
  },
  {
    id: 9,
    question: "Which wireless standard operates in the 2.4 GHz and 5 GHz bands?",
    options: ["802.11a", "802.11b", "802.11g", "802.11n"],
    correctAnswer: "802.11n"
  },
  {
    id: 10,
    question: "What is the maximum data transfer rate of USB 3.0?",
    options: ["480 Mbps", "5 Gbps", "10 Gbps", "20 Gbps"],
    correctAnswer: "5 Gbps"
  }
];

const Aplus = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // 在实际应用中，这里会从后端获取题目
    // 现在我们使用模拟数据并随机选择10道题
    const shuffled = [...mockQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setUserAnswers(prev => ({...prev, [questionId]: selectedAnswer}));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">CompTIA A+ Practice Exam</h1>
        {!quizCompleted ? (
          questions.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Question {currentQuestionIndex + 1} of {questions.length}</h2>
              <p className="mb-4">{questions[currentQuestionIndex].question}</p>
              <div className="space-y-2">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestionIndex].id}`}
                      value={option}
                      checked={userAnswers[questions[currentQuestionIndex].id] === option}
                      onChange={() => handleAnswerSelect(questions[currentQuestionIndex].id, option)}
                      className="form-radio text-green-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleNextQuestion}
                className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question"}
              </button>
            </div>
          )
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-4">Your score: {calculateScore()} out of {questions.length}</p>
            <p className="mb-4">Thank you for completing the practice exam.</p>
            <p className="text-gray-600 mb-8">
              To access more questions and full exam simulations, consider upgrading to our premium plan for just 7 CAD per month.
            </p>
            <Link
              to={`/payment`}
              className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
            >
              Upgrade Now
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Aplus;