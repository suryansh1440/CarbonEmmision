import React from 'react';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { AiFillTrophy } from 'react-icons/ai';

const Performance = () => {
    const user = useSelector(state => state.user);
    console.log(user); // Add this line to log the user object to the console for debugging
    const totalAttempts = user.correctAnswer + user.wrongAnswer;
    const accuracy = totalAttempts > 0 ? ((user.correctAnswer / totalAttempts) * 100).toFixed(1) : 0;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Performance Overview</h1>
                <p className="text-gray-600">Track your learning progress and achievements</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Questions Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 text-sm font-medium">Total Questions</h3>
                        <AiFillTrophy className="text-yellow-500 text-2xl" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{totalAttempts}</p>
                    <p className="text-sm text-gray-500 mt-2">Questions attempted</p>
                </div>

                {/* Correct Answers Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 text-sm font-medium">Correct Answers</h3>
                        <FaCheckCircle className="text-green-500 text-2xl" />
                    </div>
                    <p className="text-3xl font-bold text-green-500">{user.correctAnswer}</p>   
                    <p className="text-sm text-gray-500 mt-2">Questions answered correctly</p>
                </div>

                {/* Wrong Answers Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 text-sm font-medium">Wrong Answers</h3>
                        <FaTimesCircle className="text-red-500 text-2xl" />
                    </div>
                    <p className="text-3xl font-bold text-red-500">{user.wrongAnswer}</p>
                    <p className="text-sm text-gray-500 mt-2">Questions answered incorrectly</p>
                </div>
            </div>

            {/* Accuracy Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Overall Accuracy</h2>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div 
                        className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${accuracy}%` }}
                    ></div>
                </div>
                <p className="text-gray-600">
                    Your accuracy rate is <span className="font-semibold text-blue-600">{accuracy}%</span>
                </p>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-gray-800 font-semibold mb-4">Tips to Improve</h3>
                <ul className="space-y-2 text-gray-600">
                    <li>• Review questions you've answered incorrectly</li>
                    <li>• Take regular practice tests</li>
                    <li>• Focus on topics where you have lower accuracy</li>
                    <li>• Set daily learning goals</li>
                </ul>
            </div>
        </div>
    );
};

export default Performance;
