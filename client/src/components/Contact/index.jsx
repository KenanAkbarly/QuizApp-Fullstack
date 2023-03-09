import React, { useEffect, useRef, useState } from 'react'
import styled from './style.module.scss'
import toast, { Toaster } from "react-hot-toast";
import {
    AiOutlineInstagram,
    AiOutlineUser,
    AiOutlineMail,
  } from "react-icons/ai";
import emailjs from "@emailjs/browser";
const Contact = () => {
    const form = useRef();
    const [name, setName] = useState([])
    const [mail, setMail] = useState([])
    const [message, setMessage] = useState([])
    const nameChange = event =>{
        setName([...name,event.target.value])
    }
    const mailChange = event =>{
        setMail([...mail, event.target.value])
    }
    const messageChange = event =>{
        setMessage([...message, event.target.value])
    }
  
    const sendEmail = (e) => {
        e.preventDefault();
        if(name.length == 0 || message.length == 0 || mail.length == 0){
            toast('Bütün xanaları doldurun', {
                duration: 2000,
                position: 'top-center',
              
                // Styling
                style: {},
                className: '',
              
                // Custom Icon
                icon: '❌',
              
                // Change colors of success/error/loading icon
                iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
                },
              
                // Aria
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              });
        } 
        else{
            emailjs.sendForm('service_av4v13g', 'template_tc6z19i', form.current, 'hyuIMQftk4iaBZx3B')
            .then((result) => {
                toast('Mesaj göndərildi', {
                  duration: 4000,
                  position: 'top-center',
                
                  // Styling
                  style: {},
                  className: '',
                
                  // Custom Icon
                  icon: '📨',
                
                  // Change colors of success/error/loading icon
                  iconTheme: {
                    primary: '#000',
                    secondary: '#fff',
                  },
                
                  // Aria
                  ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                  },
                });
               
                e.target.reset()
            }
            , (error) => {
                  toast('Mesaj göndərilmedi', {
                      duration: 2000,
                      position: 'top-center',
                    
                      // Styling
                      style: {},
                      className: '',
                    
                      // Custom Icon
                      icon: '❌',
                    
                      // Change colors of success/error/loading icon
                      iconTheme: {
                        primary: '#000',
                        secondary: '#fff',
                      },
                    
                      // Aria
                      ariaProps: {
                        role: 'status',
                        'aria-live': 'polite',
                      },
                    });
              });
        }
        };
  return (
    <div>
         <div className={styled.contact_section}>
          <div className={styled.container}>
            <div className={styled.contact_body}>
              <div className={styled.contact_body_left}>
                <h2>
                    Sualların var?  {' '}  Bizimlə bölüş!
                </h2>
              <div className={styled.footer_right}>
                <h1>Bizimlə əlaqə</h1>
              <form ref={form} onSubmit={sendEmail}>
                <div className={styled.inp_body}>
                    <AiOutlineUser/>
                <input 
                onChange={nameChange}
                placeholder="İstifadəçi adı" type="text" name="user_name" />
                </div>
                <div className={styled.inp_body}>
                    <AiOutlineMail/>
                    <input
                    onChange={mailChange}
                    type="email" 
                    placeholder="E-mail" name="user_email" />
                </div>
                <div className={styled.textArea_body}>
                <textarea 
                onChange={messageChange}
                placeholder="Mesaj yazın..." name="message" />
                </div>
                <div className={styled.submit_btn}>
                <input type="submit" value="Göndər"/>
                </div>
              </form>
            </div>
              </div>
              <div className={styled.contact_body_right}>
              <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_u25cckyh.json"  background="transparent"  speed="1" loop  autoplay></lottie-player>
              </div>
            </div>
          </div>
        </div>
        <Toaster/>
    </div>
  )
}

export default Contact