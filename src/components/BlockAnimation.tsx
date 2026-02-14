// BlockAnimationSingle.tsx
'use client';
import { titleFonts } from '@/config/fonts';
import React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import styled from 'styled-components';


const base = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 2px;
  background-color: transparent;
  `;

const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 0.1rem;
  `;

const Span = styled(base)`
box-shadow: 0px 0px 6px 1px #868686;

`;



const EmptyBlock = styled(base)`background-color: transparent; color: transparent;`;

const BlockAnimation = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-4 py-8 '>
      <div className='w-full flex justify-center items-center mb-8'>
        <GridWrapper className='w-fit sm:w-full p-1 grid grid-cols-[repeat(5,_2rem)]  sm:grid-cols-[repeat(5,_3rem)] grid-rows-[repeat(4,_2rem)] sm:grid-rows-[repeat(4,_3rem)] gap-2 '>
          <Span className={"text-blue-500"}>G</Span>
          <Span>I</Span>
          <Span>B</Span>
          <EmptyBlock>*</EmptyBlock>


          <EmptyBlock>*</EmptyBlock>
          <Span className='shadow-subtle'>U</Span>
          <Span className='text-red-600'>N</Span>
          <Span >S</Span>
          <EmptyBlock>*</EmptyBlock>
          <EmptyBlock>*</EmptyBlock>

          <Span>E</Span>
          <Span>I</Span>
          <Span className='text-green-400'>N</Span>
          <Span>E</Span>
          <Span>N</Span>
          <EmptyBlock>*</EmptyBlock>

          <Span>T</Span>
          <Span>I</Span>
          <Span className='text-orange-400'>P</Span>
          <Span>P</Span>
        </GridWrapper>
      </div>
      <FaArrowDown className='text-2xl ' />
      <p className='text-gray-600 font-semibold'>Fülle das Formular aus!</p>
    </div>
  );
};

export default BlockAnimation;
