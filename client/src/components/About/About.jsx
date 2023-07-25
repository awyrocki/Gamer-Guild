import React from 'react'
import "./About.css"
import Footer from "../Footer/Footer"

function About() {
    return (
    <>
    <div id='outer-about'>
        <div id='about-container'>
            <div id='team-container'>
                <h1 id='team'>The Gamer Guild Team</h1>
            </div>
            <div className='team-member'>
                <h2 className='team-titles'>Austin Wyrocki | Full-Stack Developer</h2>
                <img className='about-img' src="https://wpmrr.com/wp-content/uploads/2019/09/gandalf.jpg" alt="Austin - Scrum Leader - Gandalf" width="300" />
                <div className='about-bio'>
                    <p> &emsp; Experienced Chemist turned Software Developer with a passion for creating innovative solutions. Throughout my career, I have honed my skills in both scientific research and software development, combining my expertise to deliver cutting-edge solutions. I thrive in collaborative environments and have a strong commitment to teamwork, recognizing the value of diverse perspectives and effective communication.</p>
                    <p> &emsp; As a lifelong learner, I remain up-to-date with the latest technologies and trends in the software development industry. This commitment to continuous growth enables me to adapt quickly and efficiently to new challenges, ensuring that my solutions are always at the forefront of innovation. I possess a strong analytical mindset, allowing me to effectively analyze and debug code, providing well-researched and cost-effective answers to complex problems.</p>
                </div>
            </div>
        <hr className='line-break'/>
            <div className='team-member'>
                <h2 className='team-titles'>Abusino Roziqov | Full-Stack Devloper</h2>
                <img className='about-img' src="https://www.looper.com/img/gallery/frodo-baggins-entire-backstory-explained/intro-1582640416.jpg" alt="sino - Frod Baggins" width="300"/>
                <div className='about-bio'>
                    <p> &emsp; I am presently taking part in a bootcamp to study the fundamentals of JavaScript, HTML, and CSS since I am passionate about becoming a software engineer. Despite the fact that I am only starting out in this sector, my passion for software development drives me to always improve my abilities.</p>
                    <p> &emsp; I used to work as a salesperson for several retail establishments, including a solar firm, before making the switch to the IT sector. I was able to perfect my communication and customer service abilities via this experience, and I can't wait to apply them in my next position as a software engineer.</p>
                    <p> &emsp; I'm dedicated to creating a digital future that transcends boundaries by combining my varied expertise with the limitless options provided by code. As we push the limits, come along on this amazing voyage with me.</p>
                </div>
            </div>
        <hr className='line-break'/>
            <div className='team-member'>
                <h2 className='team-titles'>Cyrus Fullam | Full-Stack Developer</h2>
                <img className='about-img' src="https://insidethemagic.net/wp-content/uploads/2022/07/Samwise-Gamgee-Sean-Astin-800x400.png" alt="Samwise Gamgee" width="300"/>
                <div className='about-bio'>
                    <p> &emsp; Experienced automotive mechanic turned software developer... who also likes to cook once in a while. Over the past seven years, I have honed my skills as an auto mechanic, gaining expertise in diagnosing and repairing various vehicle issues.</p>
                    <p> &emsp; From a young age I have had a connection to technology and a strong curiosity for how things work. Software development keeps that curiosity alive and allows me to create and learn every day. When not immersed in code, you can find me exploring the great outdoors or playing my favorite video games.</p>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>
    )
}

export default About