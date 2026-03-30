"use client";

import { useEffect, useState } from "react";
import { X, Smartphone, ExternalLink } from "lucide-react";

const APK_PATH = "/scoobyai.apk";
const DISMISSED_KEY = "scooby_apk_popup_dismissed";

export default function AndroidAppBanner() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Detect environment
    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const isWebView = /wv/i.test(ua) || /Version\/4.0/i.test(ua);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    // We only want the popup on the website (regular mobile browser) for Android users.
    // Skip if:
    // 1. Not an Android device
    // 2. Already in the app (WebView)
    // 3. Already in PWA standalone mode
    if (!isAndroid || isWebView || isStandalone) {
      return;
    }

    // Don't show if already dismissed in this session
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (dismissed) return;

    // Small delay so the page loads first, then popup slides in
    const timer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 350);
    sessionStorage.setItem(DISMISSED_KEY, "true");
  };

  const handleDownload = () => {
    // Trigger APK download
    const link = document.createElement("a");
    link.href = APK_PATH;
    link.download = "ScoobyAI.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleDismiss();
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes float-in {
          0% { transform: translate(-50%, -120%); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes float-out {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, -120%); opacity: 0; }
        }
        .apk-popup-container {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translate(-50%, -120%);
          z-index: 10000;
          width: calc(100% - 32px);
          max-width: 320px;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
          opacity: 0;
          pointer-events: none;
        }
        .apk-popup-container.visible {
          transform: translate(-50%, 0);
          opacity: 1;
          pointer-events: auto;
        }
        .apk-popup-inner {
          background: rgba(13, 13, 13, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(245, 197, 24, 0.3);
          border-radius: 16px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 
            0 10px 25px -5px rgba(0, 0, 0, 0.5),
            0 4px 10px -5px rgba(245, 197, 24, 0.2);
          position: relative;
          overflow: hidden;
        }
        .apk-popup-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(245, 197, 24, 0.05), transparent);
          pointer-events: none;
        }
        .apk-popup-icon {
          width: 32px;
          height: 32px;
          background: var(--primary, #f5c518);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(245, 197, 24, 0.4);
        }
        .apk-popup-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .apk-popup-msg {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          line-height: 1.2;
        }
        .apk-popup-link {
          font-size: 13px;
          color: var(--primary, #f5c518);
          font-weight: 700;
          font-family: var(--font-orbitron, sans-serif);
          display: flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          margin-top: 1px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .apk-popup-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        .apk-popup-close {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .apk-popup-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
      `}</style>
      <div className={`apk-popup-container${animateIn ? " visible" : ""}`}>
        <div className="apk-popup-inner">
          <div className="apk-popup-icon">
            <Smartphone size={18} color="#000" strokeWidth={2.5} />
          </div>
          <div className="apk-popup-content">
            <span className="apk-popup-msg">Download app for Android</span>
            <div className="apk-popup-link" onClick={handleDownload}>
              Click here <ExternalLink size={12} />
            </div>
          </div>
          <div className="apk-popup-close" onClick={handleDismiss}>
            <X size={16} />
          </div>
        </div>
      </div>
    </>
  );
}

