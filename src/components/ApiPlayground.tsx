/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { PlusIcon, MinusIcon, CheckIcon, ArrowRightIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description?: string;
  requestBody?: Record<string, any>;
  responseExample?: Record<string, any>;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  headers?: Record<string, string>;
}

interface ApiPlaygroundProps {
  endpoints: ApiEndpointProps[];
  baseUrl?: string;
  title?: string;
  className?: string;
}

const ApiPlayground: React.FC<ApiPlaygroundProps> = ({
  endpoints,
  baseUrl = 'https://api.frontend-hamroun.dev',
  title = 'API Playground',
  className = '',
}) => {
  const [activeEndpoint, setActiveEndpoint] = useState<number>(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    request: true,
    response: true,
    headers: false,
    parameters: false,
  });
  const [requestValues, setRequestValues] = useState<Record<string, any>>({});
  const [responseData, setResponseData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentEndpoint = endpoints[activeEndpoint];

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleInputChange = (key: string, value: string) => {
    setRequestValues({
      ...requestValues,
      [key]: value,
    });
  };

  const formatJson = (obj: any): string => {
    return JSON.stringify(obj, null, 2);
  };

  const getMethodColor = (method: string): string => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'POST': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'PATCH': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleSendRequest = () => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setResponseData(formatJson(currentEndpoint.responseExample || { message: 'Success' }));
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`api-playground rounded-lg border border-primary/10 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-primary/5 p-4 border-b border-primary/10">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="text-sm text-foreground/70">Base URL: {baseUrl}</div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Sidebar */}
        <div className="md:col-span-1 border-r border-primary/10 bg-background/50">
          <ul className="divide-y divide-primary/10">
            {endpoints.map((endpoint, index) => (
              <li key={index}>
                <button
                  onClick={() => setActiveEndpoint(index)}
                  className={`w-full text-left p-4 hover:bg-secondary/50 transition-colors flex items-center ${
                    activeEndpoint === index ? 'bg-secondary' : ''
                  }`}
                >
                  <span className={`mr-2 px-2 py-1 rounded text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                    {endpoint.method}
                  </span>
                  <span className="text-sm truncate">{endpoint.endpoint}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content */}
        <div className="md:col-span-3 p-4">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className={`mr-2 px-2 py-1 rounded text-xs font-bold ${getMethodColor(currentEndpoint.method)}`}>
                {currentEndpoint.method}
              </span>
              <span className="font-mono text-sm">{baseUrl}{currentEndpoint.endpoint}</span>
            </div>
            <p className="text-sm text-foreground/70">{currentEndpoint.description}</p>
          </div>

          {/* Parameters section */}
          {currentEndpoint.parameters && currentEndpoint.parameters.length > 0 && (
            <div className="mb-6 border border-primary/10 rounded-lg overflow-hidden">
              <button 
                className="w-full p-3 bg-secondary/30 text-left flex justify-between items-center"
                onClick={() => toggleSection('parameters')}
              >
                <span className="font-medium">Parameters</span>
                {expandedSections.parameters ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
              </button>
              
              {expandedSections.parameters && (
                <div className="p-4 bg-background">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-primary/10">
                        <th className="text-left py-2 px-4">Name</th>
                        <th className="text-left py-2 px-4">Type</th>
                        <th className="text-left py-2 px-4">Required</th>
                        <th className="text-left py-2 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEndpoint.parameters.map((param, idx) => (
                        <tr key={idx} className="border-b border-primary/5">
                          <td className="py-2 px-4 font-mono">{param.name}</td>
                          <td className="py-2 px-4">{param.type}</td>
                          <td className="py-2 px-4">
                            {param.required ? 
                              <CheckIcon className="w-5 h-5 text-green-500" /> : 
                              <span className="text-foreground/40">Optional</span>
                            }
                          </td>
                          <td className="py-2 px-4">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Request body section */}
          {currentEndpoint.requestBody && (
            <div className="mb-6 border border-primary/10 rounded-lg overflow-hidden">
              <button 
                className="w-full p-3 bg-secondary/30 text-left flex justify-between items-center"
                onClick={() => toggleSection('request')}
              >
                <span className="font-medium">Request Body</span>
                {expandedSections.request ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
              </button>
              
              {expandedSections.request && (
                <div className="p-4 bg-background">
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(currentEndpoint.requestBody).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-5 gap-4 items-center">
                        <label htmlFor={key} className="col-span-2 text-sm font-medium">
                          {key}
                          <span className="text-xs text-foreground/50 block">
                            {typeof value === 'string' ? 'string' : typeof value}
                          </span>
                        </label>
                        <div className="col-span-3">
                          <input
                            id={key}
                            type="text"
                            className="w-full p-2 bg-secondary/20 border border-primary/10 rounded-md focus:outline-none focus:border-primary"
                            placeholder={`Enter ${key}`}
                            value={requestValues[key] || ''}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Headers section */}
          {currentEndpoint.headers && (
            <div className="mb-6 border border-primary/10 rounded-lg overflow-hidden">
              <button 
                className="w-full p-3 bg-secondary/30 text-left flex justify-between items-center"
                onClick={() => toggleSection('headers')}
              >
                <span className="font-medium">Headers</span>
                {expandedSections.headers ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
              </button>
              
              {expandedSections.headers && (
                <div className="p-4 bg-background">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-primary/10">
                        <th className="text-left py-2 px-4">Key</th>
                        <th className="text-left py-2 px-4">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(currentEndpoint.headers).map(([key, value]) => (
                        <tr key={key} className="border-b border-primary/5">
                          <td className="py-2 px-4 font-mono">{key}</td>
                          <td className="py-2 px-4 font-mono">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Action button */}
          <div className="mb-6">
            <button
              onClick={handleSendRequest}
              className="flex items-center px-6 py-2.5 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ArrowRightIcon className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <ArrowRightIcon className="w-5 h-5 mr-2" />
                  Send Request
                </>
              )}
            </button>
          </div>

          {/* Response section */}
          <div className="border border-primary/10 rounded-lg overflow-hidden">
            <button 
              className="w-full p-3 bg-secondary/30 text-left flex justify-between items-center"
              onClick={() => toggleSection('response')}
            >
              <span className="font-medium">Response</span>
              {expandedSections.response ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
            </button>
            
            {expandedSections.response && (
              <div className="p-4 bg-background">
                <div className="relative">
                  <button 
                    onClick={() => responseData && copyToClipboard(responseData)}
                    className="absolute top-2 right-2 p-1.5 bg-secondary/50 hover:bg-secondary rounded-md transition-colors"
                    disabled={!responseData}
                    title="Copy to clipboard"
                  >
                    {copied ? 
                      <CheckIcon className="w-4 h-4 text-green-500" /> : 
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    }
                  </button>
                
                  <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-md overflow-x-auto text-sm">
                    {responseData || '// Response will appear here after sending the request'}
                  </pre>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApiPlayground;
