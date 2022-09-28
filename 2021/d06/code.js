#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2020/day/6

var lib = require('../lib'),
    filename = 'input.txt',
    data = lib.readFile(filename),
    print = console.log,
    table = console.table;

var answers, groups, questions;

/* -------------- MAIN -------------------- */
groups = data.replace(/\n\n/g, '@@').replace(/\n/g, ',').split('@@');


answers = get_answers(groups);
print(answers);

questions = get_yes_questions(answers);
print(questions.length);


/* -------------- FUNCTIONS --------------- */

function get_answers(groups){
    var answers = [];
    groups.forEach((group) => {
        answers.push(count_answers(group));
    })
    return answers;
}
function count_answers(group){
    /* Given a group object, 
    count the number of people and the number of each answer within the group. 
    Return an object of the counts. */
    var answers = {},
        values = group.split('');
    values.forEach((char) => {
        answers[char] = answers[char] + 1 || 1;
    })
    answers['people'] = answers[','] + 1 || 1;
    delete answers[','];
    return answers;
}

function get_yes_questions(answers){
    var alpha = 'abcdefghijklmnopqrstuvwxyz'.split(''),
        questions = [];
    print(answers);
    answers.forEach(group => {
        people = group['people'];
        Object.keys(group).forEach(question => {
            if (question !== 'people'){
                if(group[question] == people){ 
                    questions.push(question);
                }
            }
        })
    })
    return questions;
}