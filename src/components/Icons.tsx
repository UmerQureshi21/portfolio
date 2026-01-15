interface GitHubButtonProps {
  url: string;
}

export function GitHubButton({ url }: GitHubButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-9 h-9 bg-[rgb(231,74,74)] hover:bg-[rgb(211,54,54)] transition-colors rounded-[10px]"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    </a>
  );
}

interface LinkedInButtonProps {
  url: string;
}

export function LinkedInButton({ url }: LinkedInButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-9 h-9 bg-[rgb(231,74,74)] hover:bg-[rgb(211,54,54)] transition-colors rounded-[10px]"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    </a>
  );
}

//import { useState } from "react";

interface EmailButtonProps {
  email: string;
}

export function EmailButton({ email }: EmailButtonProps) {
  const handleClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-9 h-9 bg-[rgb(231,74,74)] hover:bg-[rgb(211,54,54)] transition-colors rounded-[10px] cursor-pointer"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    </button>
  );
}

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <EmailButton email="your-email@example.com" />
    </div>
  );
}

// export function EmailButton({ email }: EmailButtonProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");

//   const handleClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     setSubject("");
//     setMessage("");
//   };

//   const handleSend = () => {
//     if (!subject.trim() || !message.trim()) {
//       alert("Please fill in all fields");
//       return;
//     }

//     const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
//       subject
//     )}&body=${encodeURIComponent(message)}`;
//     window.location.href = mailtoLink;
//     handleClose();
//   };

//   return (
//     <>
//       <button
//         onClick={handleClick}
//         className="flex items-center justify-center w-9 h-9 bg-[rgb(231,74,74)] hover:bg-[rgb(211,54,54)] transition-colors rounded-[10px] cursor-pointer"
//       >
//         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Send an Email</h2>
//               <button
//                 onClick={handleClose}
//                 className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   To
//                 </label>
//                 <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600">
//                   {email}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   value={subject}
//                   onChange={(e) => setSubject(e.target.value)}
//                   placeholder="Email subject"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(231,74,74)]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Message
//                 </label>
//                 <textarea
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Your message"
//                   rows={5}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(231,74,74)] resize-none"
//                 />
//               </div>

//               <div className="flex gap-3 justify-end">
//                 <button
//                   onClick={handleClose}
//                   className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSend}
//                   className="px-4 py-2 bg-[rgb(231,74,74)] hover:bg-[rgb(211,54,54)] text-white rounded-md transition-colors font-medium"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
