import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
import timeCalc from "../utils/timeCalc.js";

import { useNavigate } from "react-router-dom";
import {
  signinChecker,
  questionHolder,
  singleHolder,
  userData,
} from "../state/atoms.jsx";
import PacmanLoader from "react-spinners/PacmanLoader";

import { useRecoilValue } from "recoil";
import upvote from "../assets/upvote.svg";
import downvote from "../assets/downvote.svg";
import { useParams } from "react-router-dom";
const Render = () => {
  const auth = localStorage.getItem("auth");
  const signedIn = useRecoilValue(signinChecker);
  const [answer, setAnswer] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    async function call() {
      var response = await axios.get(`http://localhost:3000/send/${id}`);
      setSingle(response.data);
    }
    call();
  }, []);

  const navigate = useNavigate();
  async function postAnswer() {
    if (!signedIn) {
      alert("Signin before submitting an answer");
    } else {
      var response = await axios.post(
        "http://localhost:3000/api/answer",
        {
          id: single.id,
          answer: answer,
        },
        {
          headers: { auth },
        }
      );
      if (response.status == 200) {
        location.reload();
      }
    }
  }
  async function questionUpdate() {}
  async function questionDelete() {
    var response = await axios.get(
      "http://localhost:3000/api/delete/question",
      {
        headers: { auth, question_id: id },
      }
    );
    navigate("/");
  }
  async function answerDelete(e) {
    const id1 = single.answer[e].id;
    var response = await axios.get("http://localhost:3000/api/delete/answer", {
      headers: { auth, answer_id: id1 },
    });
    location.reload();
  }
  async function answerUpdate() {}
  function share() {
    navigator.clipboard.writeText(window.location.href);
    alert("URL has been copied to clipboard");
  }
  return (
    <div className="flex justify-center items-center">
      {!single ? (
        <div className="flex justify-center items-center h-screen ">
          <PacmanLoader color="gray" size={30} />
        </div>
      ) : (
        <div>
          <div className="w-6/6 border-b border-slate-200 pb-2">
            <div className="text-2xl font-bold mb-4 ">{single.title}</div>
            <div className="flex flex-row">
              <div className="w-40">
                <div>
                  <img src={upvote} className="h-12" />
                </div>
                <div className="">
                  {single.upvote.length - single.downvote.length}
                </div>
                <div>
                  <img src={downvote} className="h-12" />
                </div>
              </div>
              <div>
                <div className=" items-center font-light text-xl ml-20 mb-1">
                  {single.description}
                </div>
                <div className="flex flex-row w-4/6 ml-20">
                  {single.tags.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-sky-100 mr-2 p-1 rounded font-light "
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-row justify-between">
            <div className="mr-4" onClick={share}>
                    Share
                  </div>
              {signedIn && user.name == single.name ? (
                <div className="flex flex-row text-md text-gray-500 ">
                  <div className="mr-4">Update</div>
                  

                  <div onClick={questionDelete}>Delete</div>
                </div>
              ) : null}
              <div className="ml-auto">
                <div>created {timeCalc(single.time)} ago</div>
                <div className="flex flex-row">
                  <div className="bg-orange-300 p-1.5 mr-2 rounded">
                    {single.name[0].toUpperCase()}
                  </div>
                  <div>{single.name}</div>
                </div>
              </div>
            </div>
          </div>
          {/* answer section */}
          <div>
            <p className="text-xl">{single.answer.length} answers</p>
            <div>
              {single.answer.map((item, index1) => {
                const answerTime = timeCalc(item.time);
                return (
                  <div
                    className="p-2 mb-2 border-b border-slate-200"
                    key={index1}
                  >
                    <p className="text-xl font-bold ">{item.answer}</p>
                    <div className="mt-3 flex flex-row justify-between">
                      {signedIn && user.name == item.name ? (
                        <div className="flex flex-row text-md text-gray-500 ">
                          <div className="mr-4">Update</div>
                          <div
                            data-id={index1}
                            onClick={(e) => answerDelete(e.target.dataset.id)}
                          >
                            Delete
                          </div>
                        </div>
                      ) : null}
                      <div className="ml-auto ">
                        <div>created {answerTime} ago</div>
                        <div className="flex flex-row">
                          <div className="bg-green-300 p-1.5 mr-2 rounded">
                            {item.name[0].toUpperCase()}
                          </div>
                          <div>{item.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xl mb-2">Your answer</p>
            <div>
              <textarea
                rows="10"
                cols="83"
                className="border border-slate-400"
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <button
              className="bg-sky-400 p-2 rounded mt-2"
              onClick={postAnswer}
            >
              Post your Answer
            </button>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Render;
