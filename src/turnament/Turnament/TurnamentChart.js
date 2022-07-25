import React from 'react'
import './TurnamentChart.css'

const TurnamentChart = () => {
  return (
    <div>
        <h1>EURO 2016 - tournament tree</h1>
    <div className="tournament-tree">
        <div className="slot slot--18-1 slot--top slot--left">
            <div className="team team--home">
                <span className="team__name">Szwajcaria</span><span className="team__score">1</span>
            </div>
            <div className="team team--away team--winner">
                <span className="team__name">Polska</span><span className="team__score">1</span>
            </div>
        </div>
        <div className="slot slot--18-2 slot--left">
            <div className="team team--home">
                <span className="team__name">Chorwacja</span><span className="team__score">0</span>
            </div>
            <div className="team team--away team--winner">
                <span className="team__name">Portugalia</span><span className="team__score">1</span>
            </div>
        </div>
        <div className="slot slot--18-3 slot--top slot--left">
            <div className="team team--home team--winner">
                <span className="team__name">Walia</span><span className="team__score">1</span>
            </div>
            <div className="team team--away">
                <span className="team__name">Irlandia Północna</span><span className="team__score">0</span>
            </div>
        </div>
        <div className="slot slot--18-4 slot--left">
            <div className="team team--home">
                <span className="team__name">Węgry</span><span className="team__score">0</span>
            </div>
            <div className="team team--away team--winner">
                <span className="team__name">Belgia</span><span className="team__score">4</span>
            </div>
        </div>
        <div className="slot slot--18-5 slot--top slot--right">
            <div className="team team--home team--winner">
                <span className="team__name">Niemcy</span><span className="team__score">3</span>
            </div>
            <div className="team team--away">
                <span className="team__name">Słowacja</span><span className="team__score">0</span>
            </div>
        </div>
        <div className="slot slot--18-6 slot--right">
            <div className="team team--home team--winner">
                <span className="team__name">Włochy</span><span className="team__score">2</span>
            </div>
            <div className="team team--away">
                <span className="team__name">Hiszpania</span><span className="team__score">0</span>
            </div>
        </div>
        <div className="slot slot--18-7 slot--top slot--right">
            <div className="team team--home team--winner">
                <span className="team__name">Francja</span><span className="team__score">2</span>
            </div>
            <div className="team team--away">
                <span className="team__name">Irlandia</span><span className="team__score">1</span>
            </div>
        </div>
        <div className="slot slot--18-8 slot--right">
            <div className="team team--home">
                <span className="team__name">Anglia</span><span className="team__score">1</span>
            </div>
            <div className="team team--away team--winner">
                <span className="team__name">Islandia</span><span className="team__score">2</span>
            </div>
        </div>
        <div className="slot slot--14-1 slot--left">
            <div className="team team--home">
                <span className="team__name">Polska</span><span className="team__score">1</span>
            </div>
            <div className="team team--away team--winner">
                <span className="team__name">Portugalia</span><span className="team__score">1</span>
            </div>
        </div>
        <div className="slot slot--14-2 slot--left">
            <div className="team team--home team--winner">
                <span className="team__name">Walia</span><span className="team__score">3</span>
            </div>
            <div className="team team--away">
                <span className="team__name">Belgia</span><span className="team__score">1</span>
            </div>
        </div>
        <div className="slot slot--14-3 slot--right">
            <div className="team team--home team--winner">
                <span className="team__name">Niemcy</span><span className="team__score">1</span>
            </div>
            <div className="team team--away">
                <span className="team__name">Włochy</span><span className="team__score">1</span>
            </div>
        </div>
        <div className="slot slot--14-4 slot--right">
            <div className="team team--home team--winner">
                <span className="team__name">Francja</span><span className="team__score">5</span>
            </div>
            <div className="team team--away">
                <span className="team__name">Islandia</span><span className="team__score">2</span>
            </div>
        </div>
        <div className="slot slot--12-1 slot--left">
            <div className="team team--home team--winner">
                <span className="team__name">Portugalia</span><span className="team__score">2</span>
            </div>
            <div className="team team--away">
                <span className="team__name">Walia</span><span className="team__score">0</span>
            </div>
        </div>
        <div className="slot slot--12-2 slot--right">
            <div className="team team--home">
                <span className="team__name">Niemcy</span><span className="team__score">0</span>
            </div>
            <div className="team team--away team--winner">
                <span className="team__name">Francja</span><span className="team__score">2</span>
            </div>
        </div>
        <div className="slot slot--11-1">
            <div className="team team--home team--winner">
                <span className="team__name">Portugalia</span><span className="team__score">1</span>
            </div>
            <div className="team team--away">
                <span className="team__name">Francja</span><span className="team__score">0</span>
            </div>
        </div>
    </div>
    </div>
  )
}

export default TurnamentChart
