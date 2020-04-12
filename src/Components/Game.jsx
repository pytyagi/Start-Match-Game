import React, { useState, useEffect} from 'react'
import '../App.css';
import utils from './utils'
import PlayNumber from './PlayNumber';
import StarsDisplay from './StarsDisplay';
import PlayAgain from './PlayAgain';

import { Card,Progress} from 'antd';
import 'antd/dist/antd.css';

function Game(props) {
    const [stars, setStars] = useState(utils.random(1,9));
    const [availableNums,setAvailableNums] = useState(utils.range(1,9));
    const [candidateNums,setCandidate] = useState([]);
    const [secondsLeft,setSecondsLeft] = useState(8);

    useEffect(() => {
        if(secondsLeft > 0) {
            const timeId = setTimeout(() => {
                setSecondsLeft(secondsLeft-1);
            }    
            ,1000)
        return () => clearTimeout(timeId);
        }
    })

    const gameStatus = availableNums.length === 0
    ? 'won' : secondsLeft ===0 ? 'lost' : 'active'

    const candidatesAreWrong = utils.sum(candidateNums) > stars;

    // const resetGame = () => {
    //     setStars(utils.random(1,9));
    //     setAvailableNums(utils.range(1,9));
    //     setCandidate([]);
    // }

    const numStatus = (num) => {

        if(!availableNums.includes(num))
            return 'used';
        
        if(candidateNums.includes(num))
            return candidatesAreWrong ? 'wrong':'candidate';
        
        return 'available';

    }

    const onButtonClick = (number,currentStatus) => {

        if(currentStatus === 'used'){
            return;
        }
        
        // Add the number to the candidate array
        const newCandidateSums = 
        currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn!==number)

        // If the sum of candidate array ! = total countof stars  
        if(utils.sum(newCandidateSums) !== stars) {
            setCandidate(newCandidateSums)
        } 
        else {
            const newAvailableSums = availableNums.filter(
                n => !newCandidateSums.includes(n)
            );
            
            setStars(utils.randomSumIn(newAvailableSums,9));
            setAvailableNums(newAvailableSums);
            setCandidate([]);
        }
    }
    return (
        <Card 
         bordered={true}
         
         >
        <div className ="game">

            <div className ="help">
            Pick 1 or more numbers that sum to the number of stars
            </div>
            
            <div className="body">
                <div className="left">
                    { gameStatus !== 'active' 
                     ?<PlayAgain
                        onClick = {props.startNewGame}
                        gameStatus = {gameStatus}
                     />
                     :<StarsDisplay stars = {stars}/>
                    }
                    
                </div>

                <div className="right">
                 {utils.range(1,9).map((number) =>
                    <PlayNumber 
                    key = {number} 
                    status = {numStatus(number)}
                    number = {number}
                    onClick = {onButtonClick}
                    />
                 )}
                </div>
                        
            </div>
            <div className="timer">
                {`Time Remaining: ${secondsLeft}s`}
            </div>   
            <Progress percent={secondsLeft*10} />
            
        </div>
        </Card>
    )
}
export default Game
