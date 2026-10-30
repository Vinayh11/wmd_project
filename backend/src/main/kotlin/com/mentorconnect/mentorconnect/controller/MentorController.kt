package com.mentorconnect.mentorconnect.controller

import com.mentorconnect.mentorconnect.model.Mentor
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class MentorController {
    @GetMapping("/mentors")
    fun getMentors(): List<Mentor> = listOf(
        Mentor(1, "Rahul Sharma", "Final Year", "Computer Engineering", "Java, React, Web Development", "Web Development"),
        Mentor(2, "Priya Patil", "Third Year", "AI & ML", "Python, Machine Learning, Data Science", "Artificial Intelligence"),
        Mentor(3, "Aditya Kulkarni", "Final Year", "Computer Engineering", "Java, SQL, Backend Development", "Software Development"),
        Mentor(4, "Sneha Deshmukh", "Third Year", "Information Technology", "UI/UX, HTML, CSS, JavaScript", "Frontend Development")
    )
}
