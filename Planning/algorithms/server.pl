:- use_module(library(http/http_ssl_plugin)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_cors)).

:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- use_module(library(http/http_header)).

% Cria��o de servidor HTTP em 'Port' que trata pedidos em JSON
%
% HTTP Server setup at 'Port'
startServer(Port) :-
        http_server(http_dispatch, [port(Port)]),
        asserta(port(Port)).

% Cors setup
:- set_setting(http:cors, [*]).

% Server startup
start_server:-
    startServer(3002).

% Shutdown server
stopServer:-
        retract(port(Port)),
        http_stop_server(Port,_).


:- http_handler('/Planning/Heuristic-time', heuristicTime , []).

heuristicTime(Request):-
    cors_enable(Request, [methods([get])]),!,
    heuristic_time_prepare(Request, LF),
    prolog_to_json(LF, JSONObject),
    reply_json(JSONObject, [json_object(dict)]).


heuristic_time_prepare(Request, LN) :-
        http_parameters(Request, [data(Data, [integer])]),
        format(user_output,"Data is: ~p~n",[Data]),
        consult('Heuristics.pl'),
        heuristica(X,LF,Data),
        id_para_nome(LF,LN).

:- http_handler('/Planning/Heuristic-mass', heuristicMass , []).

heuristicMass(Request):-
    cors_enable(Request, [methods([get])]),!,
    heuristic_mass_prepare(Request, LF),
    prolog_to_json(LF, JSONObject),
    reply_json(JSONObject, [json_object(dict)]).


heuristic_mass_prepare(Request, LN) :-
        http_parameters(Request, [data(Data, [integer])]),
        format(user_output,"Data is: ~p~n",[Data]),
        consult('Heuristics.pl'),
        heuristicaMaiorMassa(X,Data,LF),
        id_para_nome(LF,LN).


:- http_handler('/Planning/Genetic', genetic , []).

genetic(Request):-
    cors_enable(Request, [methods([get])]),!,
    genetic_prepare(Request, LF),
    prolog_to_json(LF, JSONObject),
    reply_json(JSONObject, [json_object(dict)]).


genetic_prepare(Request, LN) :-
        http_parameters(Request, [a(A, [integer]),b(B,[integer]),
        c(C,[integer]),d(D,[integer])]),
        format(user_output,"Data is: ~p~n",[A]),
        consult('Genetico.pl'),
        gera(LF*_,A,B,C,D),
        id_para_nome(LF,LN).



:- http_handler('/Planning/DistribuirEntregas', distribuir , []).

distribuir(Request):-
    cors_enable(Request, [methods([get])]),!,
    distribuir_prepare(Request, LF),
    maplist(json_write_dict, JSONTerms, LF),
    json_write_dict(LF,JSONTerm),
    json_write(JSONTerm,JSONObject),
    reply_json(JSONObject, [json_object(dict)]).


distribuir_prepare(Request, LN) :-
        consult('Heuristics.pl'),
        camiaoEntregas(LN).

