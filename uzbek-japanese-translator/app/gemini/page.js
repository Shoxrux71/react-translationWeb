"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; 
// import { Select } from "@/components/ui/select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Translator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [jlptSentences, setJlptSentences] = useState({
    N5: '',
    N4: '',
    N3: '',
    N2: '',
    N1: ''
  });
  const [language, setLanguage] = useState('ja'); // default to Japanese

  const translateText = async () => {
    const options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LINGVANEX_API_KEY}`
      },
      body: JSON.stringify({
        from: 'uz_UZ', // Uzbek
        to: language,
        data: text,
        platform: 'api'
      })
    };

    try {
      const response = await fetch('https://api-b2b.backenster.com/b1/api/v3/translate', options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTranslatedText(data.result);

      if (language === 'ja') {
        generateJlptSentences(data.result);
      }
    } catch (error) {
      console.error('Failed to fetch translation:', error);
    }
  };

  const generateJlptSentences = async (text) => {
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    const sentences = {};

    for (const level of levels) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LINGVANEX_API_KEY}`
        },
        body: JSON.stringify({
          text: text,
          level: level
        })
      };

      try {
        const response = await fetch('https://gemini-api-endpoint.example.com/generate', options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        sentences[level] = data.sentence;
      } catch (error) {
        console.error(`Failed to fetch sentence for JLPT ${level}:`, error);
      }
    }

    setJlptSentences(sentences);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <div className='flex justify-between mb-2'>
        {/* <Link href={"/gemini"}> <button className='border p-3 rounded'>gemini</button></Link> */}
           <div className="flex items-center space-x-3">
             <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode"><span className='text-green-500'>gemini ...</span></Label>
           </div>
      </div>
        <h1 className="text-2xl font-semibold mb-4 text-center">
          O'zbek tilida so'z yoki gap kiriting...
          <span className="text-blue-500 tracking-wider text-sm"> imloviy xatolarsiz </span>
        </h1>
        <textarea
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text in Uzbek..."
        />
        <div className="mb-4">
          <select
            className="cursor-pointer w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option className="cursor-pointer" value="ja">Japanese</option>
            <option className="cursor-pointer" value="en">English</option>
            <option className="cursor-pointer" value="ru">Russian</option>
            {/* Add more languages as needed */}
          </select>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={translateText}
        >
          Translate
        </button>
        {translatedText && (
          <div className="mt-4 p-3 border border-gray-300 rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Tarjima:</h2>
            <p>{translatedText}</p>
          </div>
        )}
        {translatedText && language === 'ja' && (
          <div className="mt-4 p-3 border border-gray-300 rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">JLPT Sentences:</h2>
            <p><strong>N5:</strong> {jlptSentences.N5}</p>
            <p><strong>N4:</strong> {jlptSentences.N4}</p>
            <p><strong>N3:</strong> {jlptSentences.N3}</p>
            <p><strong>N2:</strong> {jlptSentences.N2}</p>
            <p><strong>N1:</strong> {jlptSentences.N1}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translator;
