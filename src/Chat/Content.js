import React from 'react'
import './ChatStyle.css'
import { useEffect } from 'react';

export default function Content() {
  let BotResponses
  let HumanResponses

  useEffect(() => {
    BotResponses = [
      { precursor: 'Yes', followup: ['Glad we could help', 'Feel free to revisit this Page, if you have any further questions'] },
      { precursor: 'No', followup: ['Okay', 'Please select amongst the below options, according to your question'] },
      { precursor: 'Map', followup: ["Please make a selection for Map"] },
      { precursor: 'Notification', followup: ["Please make a selection for Notification"] },
      { precursor: 'CameraView', followup: ["Please make a selection for CameraView"] },
      { precursor: 'How to see the current location', followup: ['MapLocation could be found by clicking on 2nd right icon on the footer', "Did we solve your query?"] },
      { precursor: "Where to see the Map", followup: ["By clicking on 2nd right icon on the footer.", "Did we solve your query?"] },
      { precursor: "Where to see the Destination", followup: ["By clicking on 2nd right icon on the footer.", "Did we solve your query?"] },
      { precursor: "How to see the Destination", followup: ["Click on 2nd right icon on the footer to go to MapPage. You'll see the current Destination there.", "Did we solve your query?"] },
      { precursor: "Where to find Notification History", followup: ["Notifications could be found on the topbar by clicking 2nd last icon.", "Did we solve your query?"] },
      { precursor: "How to close the notification?", followup: ["Each Notification has a closs button on top right corner. You can use that to close the Notification.", "Did we solve your query?"] },
      { precursor: "How to Shift Cameras?", followup: ["The Ollie Bus offers 3 Different Angle views. On the camera view page you can click the buttons to switch between rear, front and side views.", "Did we solve your query?"] },
      { precursor: "Details on Cameras Used", followup: ["Some of the best Cameras available in the current market have been used in Ollie.", "Did we solve your query?"] }
    ]

    HumanResponses = [
      { precursor: 'Did we solve your query?', followup: ["Yes", "No"] },
      { precursor: 'Feel free to revisit this Page, if you have any further questions', followup: [] },
      { precursor: 'Please select amongst the below options, according to your question', followup: ["Map", "Notification", "CameraView"] },
      { precursor: 'Please make a selection for Map', followup: ["How to see the current location", "Where to see the Map", "Where to see the Destination"] },
      { precursor: 'Please make a selection for Notification', followup: ["Where to find Notification History", "How to close the notification?"] },
      { precursor: 'Please make a selection for CameraView', followup: ["How to Shift Cameras?", "Details on Cameras Used"] },
      { precursor: "How to see the current location", followup: ['Yes', 'No'] }
    ]

    // Bot Messages to Intiate Chat
    document.getElementById('Text-Response').innerHTML =
      `<div class="ChatImage unblurTransition"}}>
        <img src="images/support.png" alt="Icon"/>
      </div>
      <div style="text-align: left">
        <div class="TextChatMsg RightTransition">Hi! It's your messaging assistant.</div>
        <div class="TextChatMsg RightTransition">What can I help you with?</div>
        <div class="ShowTimeText unblurDelayedTransition"></div>
      </div>`
    // Showing Time for Bot Messages
    document.getElementsByClassName('ShowTimeText')[document.getElementsByClassName('ShowTimeText').length - 1].onload = currTime(document.getElementsByClassName('ShowTimeText')[document.getElementsByClassName('ShowTimeText').length - 1])

    // Showing Bot Button-Options for Initiating Chat response    
    document.getElementById('ButtonBar').innerHTML =
      `<button class="responseBtn DownShiftTransition">Map</button>
    <button class="responseBtn DownShiftTransition">Notification</button>
    <button class="responseBtn DownShiftTransition">CameraView</button>`
    // Making Buttons clickable
    Array.from(document.getElementsByClassName('responseBtn')).forEach((elem) => {
      elem.onclick = () => ShowResponse(elem)
    })
  }, []);


  // As Button response is pressed the below function executes
  function ShowResponse(elem) {
    // Showing the clicked button as a User side's message
    document.getElementById('Text-Response').innerHTML +=
      `<span></span>
       <div>
        <div style="float:right; display:grid;">
          <div class="ResponseChatMsg unblurTransition ${elem.innerHTML}" style="float:right; margin-right:5px">
            ${elem.innerHTML}
          </div>
          <div class='ShowTimeResponse unblurTransition'></div>
        </div>
      </div>`
    // Adding CSS Animation through JS, on the User Sides's messages. Adding direct CSS classes was making all elems going through animation all over again when new elem is added.
    Array.from(document.getElementsByClassName('ResponseChatMsg')).forEach((item) => {
      if (item.classList.contains("unblurTransition")) {
        item.classList.remove("unblurTransition")
      }
    })
    document.getElementsByClassName('ResponseChatMsg')[document.getElementsByClassName('ResponseChatMsg').length - 1].addEventListener('load', AddAnimation('unblurTransition', document.getElementsByClassName('ResponseChatMsg')[document.getElementsByClassName('ResponseChatMsg').length - 1]))
    // Adding time to user side message
    document.getElementsByClassName(elem.innerHTML)[document.getElementsByClassName(elem.innerHTML).length - 1].nextElementSibling.onload = currTime(document.getElementsByClassName(elem.innerHTML)[document.getElementsByClassName(elem.innerHTML).length - 1].nextElementSibling)

    // Prompting new Bot Reply
    let BotReplyMsg = ""
    let BotReplyLastMsg
    let NumberOfConsecutiveMsgInBotReplyMsg = 0
    BotResponses.forEach(BotResponse => {
      // Match the button clicked with BotResponse precursor to fetch the followup of matching Item
      if (BotResponse.precursor === elem.innerHTML) {
        BotResponse.followup.forEach((followupItem, followupItemIndex) => {
          NumberOfConsecutiveMsgInBotReplyMsg += 1
          BotReplyMsg += `<div class="TextChatMsg ${followupItem}">${followupItem}</div>`
        })
        // Set Bot Reply's Last Message
        BotReplyLastMsg = BotResponse.followup[BotResponse.followup.length - 1]
        // Place the new response in the html body
        document.getElementById('Text-Response').innerHTML +=
          `<div class="ChatImage"}}>
                  <img src="images/support.png" alt="Icon"/>
           </div>
           <div style="text-align: left">
              ${BotReplyMsg}              
              <div class="ShowTimeText"></div>
           </div>`
        // Display time for new botresponse
        document.getElementsByClassName('ShowTimeText')[document.getElementsByClassName("ShowTimeText").length - 1].onload = currTime(document.getElementsByClassName('ShowTimeText')[document.getElementsByClassName("ShowTimeText").length - 1])
        // Adding CSS Animation to Buttons, through js; as otherwise all elems were going through animation all over again when new elem is added
        Array.from(document.getElementsByClassName('ChatImage')).forEach((item) => {
          if (item.classList.contains("unblurTransition")) {
            item.classList.remove("unblurTransition")
          }
        })
        document.getElementsByClassName('ChatImage')[document.getElementsByClassName('ChatImage').length - 1].addEventListener('load', AddAnimation('unblurTransition', document.getElementsByClassName('ChatImage')[document.getElementsByClassName('ChatImage').length - 1]))
        Array.from(document.getElementsByClassName('ShowTimeText')).forEach((item) => {
          if (item.classList.contains("unblurDelayedTransition")) {
            item.classList.remove("unblurDelayedTransition")
          }
        })
        document.getElementsByClassName('ShowTimeText')[document.getElementsByClassName('ShowTimeText').length - 1].addEventListener('load', AddAnimation('unblurDelayedTransition', document.getElementsByClassName('ShowTimeText')[document.getElementsByClassName('ShowTimeText').length - 1]))
        Array.from(document.getElementsByClassName('TextChatMsg')).forEach((item) => {
          if (item.classList.contains("RightTransition")) {
            item.classList.remove("RightTransition")
          }
        })
        for (let i = 0; i < NumberOfConsecutiveMsgInBotReplyMsg; i++) {
          document.getElementsByClassName('TextChatMsg')[document.getElementsByClassName('TextChatMsg').length - (i + 1)].addEventListener('load', AddAnimation('RightTransition', document.getElementsByClassName('TextChatMsg')[document.getElementsByClassName('TextChatMsg').length - (i + 1)]))
        }
        // Scroll the page to the bottom as new bot response gets added at the bottom of the webpage
        document.getElementsByClassName('ChatImage')[document.getElementsByClassName('ChatImage').length - 1].addEventListener('load', ScrollToBottom())
      }
    })

    // Prompting new Buttons
    let BtnReplyMsg = ''
    HumanResponses.forEach((HumanResponse) => {
      if (HumanResponse.precursor === BotReplyLastMsg) {
        // Show Either response Buttons or a Chat Ending Message.
        if (HumanResponse.followup.length === 0) {
          document.getElementById('ButtonBar').innerHTML = "<div style='text-align:center; color:#6c7575;' class='unblurDelayedTransition'> Chat Ended </div>"
        }
        else {
          HumanResponse.followup.forEach((followupItem) => { BtnReplyMsg += `<button class="responseBtn DownShiftTransition">${followupItem}</button>` })
          document.getElementById('ButtonBar').innerHTML = BtnReplyMsg
        }
      }
    })
    // Making the added Buttons Clickable
    Array.from(document.getElementsByClassName('responseBtn')).forEach((elem) => {
      elem.onclick = () => ShowResponse(elem)
    })
  }


  function AddAnimation(AnimationClassName, Element) {
    Element.className += ` ${AnimationClassName}`
    console.log(AnimationClassName, Element)
  }

  function ScrollToBottom() {
    document.getElementsByClassName('chatContainer')[0].scrollTop = document.getElementsByClassName('chatContainer')[0].scrollHeight
  }

  function currTime(TimeElem) {
    var d = new Date()
    let amORpm = d.getHours() < 12 ? ' AM' : ' PM'

    let h
    if (d.getHours() > 13) {
      h = d.getHours() - 12
    }
    else {
      h = d.getHours()
    }

    h = (h < 10 ? '0' : '') + h
    let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
    let i = h + ':' + m + amORpm

    TimeElem.innerHTML = i
  }


  return (
    <>
      <div className="chatContainer" style={{ height: '40.2vw', textAlign: 'center', verticalAlign: 'middle', position: 'relative', overflow: 'auto' }}>
        <h1>Chat Service</h1>
        <div id='Text-Response'></div>
      </div>
      <div className='chatContainer' style={{ position: 'relative' }}>
        <div id='ButtonBar'></div>
      </div>
    </>
  )
}
