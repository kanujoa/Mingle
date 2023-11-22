import React, { useState } from 'react';
import { StyleFormContainer } from './styles';
import { LongButtonComponent } from '../LongButtonComponent';
import { InputComponent } from '../InputComponent';
import { Link, useNavigate } from 'react-router-dom';
import { postPassword } from '../../hooks/usePostPassword';
interface FindPasswordProps {
  initialUserEmail: string;
  initialUserNickname: string;
}
export default function FindPasswordComponent({
  initialUserEmail,
  initialUserNickname,
}: FindPasswordProps) {
  const [userEmail, setUserEmail] = useState(initialUserEmail);
  const [userNickname, setUserNickname] = useState(initialUserNickname);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userEmail || !userNickname) {
      alert('이메일과 닉네임을 모두 입력해주세요.');
      return;
    }

    try {
      await postPassword({ userEmail, userNickname });
      navigate('/completerecoverypw'); //넘어가는 과정에서 꽤 지연시간이 발생해서 추후 수정예정
    } catch (error) {
      alert('이메일 또는 닉네임이 일치하지 않습니다.');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setUserEmail(email);
    if (!validateEmail(email) && email) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  return (
    <>
      <StyleFormContainer>
        <div style={{ position: 'relative', width: '100%' }}>
          <Link to="/">
            <img src="/img/Logo.png" className="mx-auto" />
          </Link>
          <InputComponent
            id="user-email"
            label="이메일"
            type="email"
            value={userEmail}
            placeholder="이메일을 입력하세요."
            onChange={handleEmailChange}
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          <InputComponent
            id="user-nickname"
            label="닉네임"
            type="text"
            value={userNickname}
            placeholder="닉네임을 입력하세요."
            onChange={(e) => setUserNickname(e.target.value)}
          />
        </div>
        <LongButtonComponent text="비밀번호 찾기" onClick={handleClick} />
      </StyleFormContainer>
    </>
  );
}
