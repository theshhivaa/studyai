import React from 'react';

const ScoobyyAvatar = ({ size = 40, variant = 'black' }) => {
  // Styles logic:
  // variant='black' (Yellow on Black): Circle #111111, Stroke #f5c518, Features #f5c518
  // variant='yellow' (Black on Yellow): Circle #f5c518, Stroke #0d0d0d, Features #0d0d0d
  // variant='outline': Circle transparent, Stroke #f5c518, Features #f5c518

  const colors = {
    black: {
      circle: '#111111',
      stroke: '#f5c518',
      features: '#f5c518',
      highlights: '#ffffff',
      mouth: '#c49a00',
      innerFace: '#1a1209'
    },
    yellow: {
      circle: '#f5c518',
      stroke: '#0d0d0d',
      features: '#0d0d0d',
      highlights: '#ffffff',
      mouth: '#0d0d0d', 
      innerFace: '#0d0d0d' 
    },
    outline: {
      circle: 'transparent',
      stroke: '#f5c518',
      features: '#f5c518',
      highlights: '#ffffff',
      mouth: '#c49a00',
      innerFace: 'transparent'
    }
  };

  const c = colors[variant] || colors.black;

  const styles = `
    @keyframes blink {
      0%, 88%, 100% { transform: scaleY(1); }
      92% { transform: scaleY(0.05); }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }
    @keyframes earMove {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-8deg); }
    }
    @keyframes tailWag {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(15deg); }
    }
    .scooby-body { animation: breathe 3s ease-in-out infinite; transform-origin: center; }
    .scooby-eye-l { 
      animation: blink 4s ease-in-out infinite; 
      transform-origin: 49px 62px; 
    }
    .scooby-eye-r { 
      animation: blink 4s ease-in-out infinite 0.1s; 
      transform-origin: 71px 62px; 
    }
    .scooby-ear-l { 
      animation: earMove 5s ease-in-out infinite; 
      transform-origin: 38px 40px; 
    }
    .scooby-tail {
      animation: tailWag 1s ease-in-out infinite;
      transform-origin: 88px 70px;
    }
  `;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="scooby-logo"
    >
      <style>{styles}</style>

      {/* Outer circle */}
      <circle cx="60" cy="60" r="56" fill={c.circle} stroke={c.stroke} strokeWidth="3" />

      {/* Left ear */}
      <ellipse
        cx="38" cy="30" rx="10" ry="15"
        fill={c.features}
        transform="rotate(-15 38 30)"
        className="scooby-ear-l"
      />

      {/* Right ear */}
      <ellipse
        cx="82" cy="30" rx="10" ry="15"
        fill={c.features}
        transform="rotate(15 82 30)"
      />

      {/* Face */}
      <ellipse
        cx="60" cy="68" rx="28" ry="25"
        fill={c.features}
        className="scooby-body"
      />

      {/* Inner face */}
      <ellipse cx="60" cy="65" rx="20" ry="18" fill={c.innerFace} />

      {/* Eyes */}
      <g className="scooby-eyes">
        <ellipse cx="49" cy="62" rx="5.5" ry="6.5" fill={c.highlights} className="scooby-eye-l" />
        <ellipse cx="71" cy="62" rx="5.5" ry="6.5" fill={c.highlights} className="scooby-eye-r" />
        <circle cx="49" cy="63" r="3.2" fill={c.stroke} />
        <circle cx="71" cy="63" r="3.2" fill={c.stroke} />
      </g>

      {/* Nose */}
      <ellipse cx="60" cy="73" rx="5" ry="3.5" fill={variant === 'yellow' ? c.stroke : '#c49a00'} />

      {/* Mouth */}
      <path
        d="M54 78 Q60 83 66 78"
        stroke={variant === 'yellow' ? c.stroke : '#c49a00'}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Tail */}
      <path
        d="M88 70 Q98 66 96 76 Q94 84 86 80"
        fill={c.features}
        className="scooby-tail"
      />
    </svg>
  );
};

export default ScoobyyAvatar;
