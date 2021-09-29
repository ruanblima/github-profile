import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/github_logo.png';
import logoImgTitle from '../../assets/github_logo_title.svg';

import * as S from './styles';

const Dashboard: React.FC = () => {
  return (
    <>

    <S.Img src={logoImg} />
    <S.ImgTitle src={logoImgTitle} />

    <S.Title>Explore repositórios no Github</S.Title>

    <S.Form>
      <input placeholder={"Digite o nome do repositório"} />
      <button type={"submit"}>Pesquisar</button>
    </S.Form>

    <S.Repositories>
      <a href={"test"}>
        <img src="https://avatars.githubusercontent.com/u/57442366?v=4"
        alt="Ruan Lima"
        />
        <div>
          <strong>ruanblima/BookFinder</strong>
          <p>Busca de lisvros</p>
        </div>

        <FiChevronRight size={20} />

      </a>

      <a href={"test"}>
        <img src="https://avatars.githubusercontent.com/u/57442366?v=4"
        alt="Ruan Lima"
        />
        <div>
          <strong>ruanblima/BookFinder</strong>
          <p>Busca de lisvros</p>
        </div>

        <FiChevronRight size={20} />

      </a>

      <a href={"test"}>
        <img src="https://avatars.githubusercontent.com/u/57442366?v=4"
        alt="Ruan Lima"
        />
        <div>
          <strong>ruanblima/BookFinder</strong>
          <p>Busca de lisvros</p>
        </div>

        <FiChevronRight size={20} />

      </a>
    </S.Repositories>



    </>
  );
};

export default Dashboard;
