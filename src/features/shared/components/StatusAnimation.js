// src/components/StatusAnimation.jsx
import React from 'react';
//import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
//import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie from 'lottie-react'
import successAnim from '../assets/animations/success_anim'
import errorAnim from '../assets/animations/error_anim'
import loadingAnim from '../assets/animations/loading_anim'

import { StatusType } from '../store/modal-store'; // Importe o enum

const StatusAnimation = ({ statusType }) => {
  switch (statusType) {
    case StatusType.LOADING:
      // Spinner de Loading do Tailwind
      return (
        <div className="flex items-center justify-center">
{/*          <ArrowPathIcon className="h-12 w-12 text-blue-500 animate-spin" /> */ }
        <Lottie animationData={loadingAnim} loop={true} />
        </div>
      );
    case StatusType.OK:
      // Ícone de Sucesso
      return (
        <div className="flex items-center justify-center">
          {/*<CheckCircleIcon className="h-12 w-12 text-green-500" />*/}
                  <Lottie animationData={successAnim} loop={false} />

        </div>
      );
    case StatusType.FAIL:
      // Ícone de Falha
      return (
        <div className="flex items-center justify-center">
          {/*<XCircleIcon className="h-12 w-12 text-red-500" />*/}
                  <Lottie animationData={errorAnim} loop={false} />

        </div>
      );
    default:
      return null;
  }
};

export default StatusAnimation;