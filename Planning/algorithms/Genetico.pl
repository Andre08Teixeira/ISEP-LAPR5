:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.

% Primary knowledge base


idArmazem('Arouca',1).
idArmazem('Espinho',2).
idArmazem('Gondomar',3).
idArmazem('Maia',4).
idArmazem('Matosinhos',5).
idArmazem('Oliveira de Azemeis',6).
idArmazem('Paredes',7).
idArmazem('Porto',8).
idArmazem('Povoa de Varzim',9).
idArmazem('Santa Maria da Feira',10).
idArmazem('Santo Tirso',11).
idArmazem('Sao Joao da Madeira',12).
idArmazem('Trofa',13).
idArmazem('Vale de Cambra',14).
idArmazem('Valongo',15).
idArmazem('Vila do Conde',16).
idArmazem('Vila Nova de Gaia',17).


%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
carateristicasCam(eTruck01,7500,4300,80,100,60).
carateristicasCam(eTruck02,7500,4300,80,100,60).
carateristicasCam(eTruck03,7500,4300,80,100,60).

%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
dadosCam_t_e_ta(eTruck01,1,2,122,42,0).
dadosCam_t_e_ta(eTruck01,1,3,122,46,0).
dadosCam_t_e_ta(eTruck01,1,4,151,54,25).
dadosCam_t_e_ta(eTruck01,1,5,147,52,25).
dadosCam_t_e_ta(eTruck01,1,6,74,24,0).
dadosCam_t_e_ta(eTruck01,1,7,116,35,0).
dadosCam_t_e_ta(eTruck01,1,8,141,46,0).
dadosCam_t_e_ta(eTruck01,1,9,185,74,53).
dadosCam_t_e_ta(eTruck01,1,10,97,30,0).
dadosCam_t_e_ta(eTruck01,1,11,164,64,40).
dadosCam_t_e_ta(eTruck01,1,12,76,23,0).
dadosCam_t_e_ta(eTruck01,1,13,174,66,45).
dadosCam_t_e_ta(eTruck01,1,14,59,18,0).
dadosCam_t_e_ta(eTruck01,1,15,132,51,24).
dadosCam_t_e_ta(eTruck01,1,16,181,68,45).
dadosCam_t_e_ta(eTruck01,1,17,128,45,0).

dadosCam_t_e_ta(eTruck01,2,1,116,42,0).
dadosCam_t_e_ta(eTruck01,2,3,55,22,0).
dadosCam_t_e_ta(eTruck01,2,4,74,25,0).
dadosCam_t_e_ta(eTruck01,2,5,65,22,0).
dadosCam_t_e_ta(eTruck01,2,6,69,27,0).
dadosCam_t_e_ta(eTruck01,2,7,74,38,0).
dadosCam_t_e_ta(eTruck01,2,8,61,18,0).
dadosCam_t_e_ta(eTruck01,2,9,103,44,0).
dadosCam_t_e_ta(eTruck01,2,10,36,14,0).
dadosCam_t_e_ta(eTruck01,2,11,88,41,0).
dadosCam_t_e_ta(eTruck01,2,12,61,19,0).
dadosCam_t_e_ta(eTruck01,2,13,95,42,0).
dadosCam_t_e_ta(eTruck01,2,14,78,34,0).
dadosCam_t_e_ta(eTruck01,2,15,69,30,0).
dadosCam_t_e_ta(eTruck01,2,16,99,38,0).
dadosCam_t_e_ta(eTruck01,2,17,46,14,0).

dadosCam_t_e_ta(eTruck01,3,1,120,45,0).
dadosCam_t_e_ta(eTruck01,3,2,50,22,0).
dadosCam_t_e_ta(eTruck01,3,4,46,15,0).
dadosCam_t_e_ta(eTruck01,3,5,46,14,0).
dadosCam_t_e_ta(eTruck01,3,6,74,37,0).
dadosCam_t_e_ta(eTruck01,3,7,63,23,0).
dadosCam_t_e_ta(eTruck01,3,8,38,8,0).
dadosCam_t_e_ta(eTruck01,3,9,84,36,0).
dadosCam_t_e_ta(eTruck01,3,10,59,28,0).
dadosCam_t_e_ta(eTruck01,3,11,61,27,0).
dadosCam_t_e_ta(eTruck01,3,12,67,32,0).
dadosCam_t_e_ta(eTruck01,3,13,67,29,0).
dadosCam_t_e_ta(eTruck01,3,14,82,38,0).
dadosCam_t_e_ta(eTruck01,3,15,34,8,0).
dadosCam_t_e_ta(eTruck01,3,16,80,30,0).
dadosCam_t_e_ta(eTruck01,3,17,36,10,0).

dadosCam_t_e_ta(eTruck01,4,1,149,54,25).
dadosCam_t_e_ta(eTruck01,4,2,65,24,0).
dadosCam_t_e_ta(eTruck01,4,3,46,16,0).
dadosCam_t_e_ta(eTruck01,4,5,27,10,0).
dadosCam_t_e_ta(eTruck01,4,6,103,47,0).
dadosCam_t_e_ta(eTruck01,4,7,55,27,0).
dadosCam_t_e_ta(eTruck01,4,8,36,10,0).
dadosCam_t_e_ta(eTruck01,4,9,50,26,0).
dadosCam_t_e_ta(eTruck01,4,10,78,34,0).
dadosCam_t_e_ta(eTruck01,4,11,42,19,0).
dadosCam_t_e_ta(eTruck01,4,12,97,42,0).
dadosCam_t_e_ta(eTruck01,4,13,44,11,0).
dadosCam_t_e_ta(eTruck01,4,14,111,48,0).
dadosCam_t_e_ta(eTruck01,4,15,32,13,0).
dadosCam_t_e_ta(eTruck01,4,16,53,14,0).
dadosCam_t_e_ta(eTruck01,4,17,38,11,0).

dadosCam_t_e_ta(eTruck01,5,1,141,51,24).
dadosCam_t_e_ta(eTruck01,5,2,55,20,0).
dadosCam_t_e_ta(eTruck01,5,3,48,14,0).
dadosCam_t_e_ta(eTruck01,5,4,25,9,0).
dadosCam_t_e_ta(eTruck01,5,6,97,44,0).
dadosCam_t_e_ta(eTruck01,5,7,55,28,0).
dadosCam_t_e_ta(eTruck01,5,8,29,7,0).
dadosCam_t_e_ta(eTruck01,5,9,48,24,0).
dadosCam_t_e_ta(eTruck01,5,10,69,30,0).
dadosCam_t_e_ta(eTruck01,5,11,53,26,0).
dadosCam_t_e_ta(eTruck01,5,12,95,36,0).
dadosCam_t_e_ta(eTruck01,5,13,63,20,0).
dadosCam_t_e_ta(eTruck01,5,14,105,45,0).
dadosCam_t_e_ta(eTruck01,5,15,34,14,0).
dadosCam_t_e_ta(eTruck01,5,16,46,18,0).
dadosCam_t_e_ta(eTruck01,5,17,27,7,0).

dadosCam_t_e_ta(eTruck01,6,1,69,23,0).
dadosCam_t_e_ta(eTruck01,6,2,71,27,0).
dadosCam_t_e_ta(eTruck01,6,3,74,38,0).
dadosCam_t_e_ta(eTruck01,6,4,103,46,0).
dadosCam_t_e_ta(eTruck01,6,5,99,44,0).
dadosCam_t_e_ta(eTruck01,6,7,88,48,0).
dadosCam_t_e_ta(eTruck01,6,8,92,38,0).
dadosCam_t_e_ta(eTruck01,6,9,134,66,45).
dadosCam_t_e_ta(eTruck01,6,10,42,14,0).
dadosCam_t_e_ta(eTruck01,6,11,116,56,30).
dadosCam_t_e_ta(eTruck01,6,12,23,9,0).
dadosCam_t_e_ta(eTruck01,6,13,126,58,33).
dadosCam_t_e_ta(eTruck01,6,14,25,9,0).
dadosCam_t_e_ta(eTruck01,6,15,84,44,0).
dadosCam_t_e_ta(eTruck01,6,16,132,60,35).
dadosCam_t_e_ta(eTruck01,6,17,80,38,0).

dadosCam_t_e_ta(eTruck01,7,1,116,36,0).
dadosCam_t_e_ta(eTruck01,7,2,71,38,0).
dadosCam_t_e_ta(eTruck01,7,3,61,22,0).
dadosCam_t_e_ta(eTruck01,7,4,53,26,0).
dadosCam_t_e_ta(eTruck01,7,5,53,28,0).
dadosCam_t_e_ta(eTruck01,7,6,88,48,0).
dadosCam_t_e_ta(eTruck01,7,8,59,26,0).
dadosCam_t_e_ta(eTruck01,7,9,88,48,0).
dadosCam_t_e_ta(eTruck01,7,10,84,44,0).
dadosCam_t_e_ta(eTruck01,7,11,74,22,0).
dadosCam_t_e_ta(eTruck01,7,12,82,42,0).
dadosCam_t_e_ta(eTruck01,7,13,76,31,0).
dadosCam_t_e_ta(eTruck01,7,14,97,49,21).
dadosCam_t_e_ta(eTruck01,7,15,29,16,0).
dadosCam_t_e_ta(eTruck01,7,16,84,42,0).
dadosCam_t_e_ta(eTruck01,7,17,69,30,0).

dadosCam_t_e_ta(eTruck01,8,1,134,46,0).
dadosCam_t_e_ta(eTruck01,8,2,59,18,0).
dadosCam_t_e_ta(eTruck01,8,3,32,6,0).
dadosCam_t_e_ta(eTruck01,8,4,34,10,0).
dadosCam_t_e_ta(eTruck01,8,5,32,7,0).
dadosCam_t_e_ta(eTruck01,8,6,88,38,0).
dadosCam_t_e_ta(eTruck01,8,7,57,26,0).
dadosCam_t_e_ta(eTruck01,8,9,69,30,0).
dadosCam_t_e_ta(eTruck01,8,10,65,26,0).
dadosCam_t_e_ta(eTruck01,8,11,53,22,0).
dadosCam_t_e_ta(eTruck01,8,12,82,34,0).
dadosCam_t_e_ta(eTruck01,8,13,61,24,0).
dadosCam_t_e_ta(eTruck01,8,14,97,40,0).
dadosCam_t_e_ta(eTruck01,8,15,36,12,0).
dadosCam_t_e_ta(eTruck01,8,16,65,23,0).
dadosCam_t_e_ta(eTruck01,8,17,32,6,0).

dadosCam_t_e_ta(eTruck01,9,1,181,72,50).
dadosCam_t_e_ta(eTruck01,9,2,95,41,0).
dadosCam_t_e_ta(eTruck01,9,3,86,35,0).
dadosCam_t_e_ta(eTruck01,9,4,55,24,0).
dadosCam_t_e_ta(eTruck01,9,5,48,23,0).
dadosCam_t_e_ta(eTruck01,9,6,134,65,42).
dadosCam_t_e_ta(eTruck01,9,7,95,47,0).
dadosCam_t_e_ta(eTruck01,9,8,69,28,0).
dadosCam_t_e_ta(eTruck01,9,10,109,51,24).
dadosCam_t_e_ta(eTruck01,9,11,61,29,0).
dadosCam_t_e_ta(eTruck01,9,12,132,57,31).
dadosCam_t_e_ta(eTruck01,9,13,67,19,0).
dadosCam_t_e_ta(eTruck01,9,14,143,66,45).
dadosCam_t_e_ta(eTruck01,9,15,71,34,0).
dadosCam_t_e_ta(eTruck01,9,16,15,3,0).
dadosCam_t_e_ta(eTruck01,9,17,67,28,0).

dadosCam_t_e_ta(eTruck01,10,1,97,30,0).
dadosCam_t_e_ta(eTruck01,10,2,34,14,0).
dadosCam_t_e_ta(eTruck01,10,3,59,27,0).
dadosCam_t_e_ta(eTruck01,10,4,78,33,0).
dadosCam_t_e_ta(eTruck01,10,5,71,30,0).
dadosCam_t_e_ta(eTruck01,10,6,40,14,0).
dadosCam_t_e_ta(eTruck01,10,7,82,42,0).
dadosCam_t_e_ta(eTruck01,10,8,65,24,0).
dadosCam_t_e_ta(eTruck01,10,9,109,52,25).
dadosCam_t_e_ta(eTruck01,10,11,92,46,0).
dadosCam_t_e_ta(eTruck01,10,12,32,6,0).
dadosCam_t_e_ta(eTruck01,10,13,99,46,0).
dadosCam_t_e_ta(eTruck01,10,14,63,17,0).
dadosCam_t_e_ta(eTruck01,10,15,74,34,0).
dadosCam_t_e_ta(eTruck01,10,16,105,46,0).
dadosCam_t_e_ta(eTruck01,10,17,53,23,0).

dadosCam_t_e_ta(eTruck01,11,1,164,65,42).
dadosCam_t_e_ta(eTruck01,11,2,88,41,0).
dadosCam_t_e_ta(eTruck01,11,3,65,28,0).
dadosCam_t_e_ta(eTruck01,11,4,42,18,0).
dadosCam_t_e_ta(eTruck01,11,5,55,25,0).
dadosCam_t_e_ta(eTruck01,11,6,118,57,31).
dadosCam_t_e_ta(eTruck01,11,7,74,23,0).
dadosCam_t_e_ta(eTruck01,11,8,59,23,0).
dadosCam_t_e_ta(eTruck01,11,9,63,28,0).
dadosCam_t_e_ta(eTruck01,11,10,97,46,0).
dadosCam_t_e_ta(eTruck01,11,12,111,52,25).
dadosCam_t_e_ta(eTruck01,11,13,25,7,0).
dadosCam_t_e_ta(eTruck01,11,14,126,58,33).
dadosCam_t_e_ta(eTruck01,11,15,53,25,0).
dadosCam_t_e_ta(eTruck01,11,16,59,27,0).
dadosCam_t_e_ta(eTruck01,11,17,67,27,0).

dadosCam_t_e_ta(eTruck01,12,1,76,23,0).
dadosCam_t_e_ta(eTruck01,12,2,61,19,0).
dadosCam_t_e_ta(eTruck01,12,3,67,32,0).
dadosCam_t_e_ta(eTruck01,12,4,97,41,0).
dadosCam_t_e_ta(eTruck01,12,5,92,38,0).
dadosCam_t_e_ta(eTruck01,12,6,19,8,0).
dadosCam_t_e_ta(eTruck01,12,7,82,42,0).
dadosCam_t_e_ta(eTruck01,12,8,86,33,0).
dadosCam_t_e_ta(eTruck01,12,9,128,61,37).
dadosCam_t_e_ta(eTruck01,12,10,32,6,0).
dadosCam_t_e_ta(eTruck01,12,11,109,50,23).
dadosCam_t_e_ta(eTruck01,12,13,120,53,26).
dadosCam_t_e_ta(eTruck01,12,14,40,10,0).
dadosCam_t_e_ta(eTruck01,12,15,78,38,0).
dadosCam_t_e_ta(eTruck01,12,16,126,54,28).
dadosCam_t_e_ta(eTruck01,12,17,74,32,0).

dadosCam_t_e_ta(eTruck01,13,1,174,65,42).
dadosCam_t_e_ta(eTruck01,13,2,107,35,0).
dadosCam_t_e_ta(eTruck01,13,3,74,29,0).
dadosCam_t_e_ta(eTruck01,13,4,46,11,0).
dadosCam_t_e_ta(eTruck01,13,5,67,20,0).
dadosCam_t_e_ta(eTruck01,13,6,128,57,31).
dadosCam_t_e_ta(eTruck01,13,7,80,30,0).
dadosCam_t_e_ta(eTruck01,13,8,76,20,0).
dadosCam_t_e_ta(eTruck01,13,9,67,20,0).
dadosCam_t_e_ta(eTruck01,13,10,105,47,0).
dadosCam_t_e_ta(eTruck01,13,11,27,7,0).
dadosCam_t_e_ta(eTruck01,13,12,122,52,25).
dadosCam_t_e_ta(eTruck01,13,14,137,58,33).
dadosCam_t_e_ta(eTruck01,13,15,67,17,0).
dadosCam_t_e_ta(eTruck01,13,16,59,15,0).
dadosCam_t_e_ta(eTruck01,13,17,78,22,0).

dadosCam_t_e_ta(eTruck01,14,1,59,18,0).
dadosCam_t_e_ta(eTruck01,14,2,80,35,0).
dadosCam_t_e_ta(eTruck01,14,3,80,38,0).
dadosCam_t_e_ta(eTruck01,14,4,109,46,0).
dadosCam_t_e_ta(eTruck01,14,5,105,45,0).
dadosCam_t_e_ta(eTruck01,14,6,27,9,0).
dadosCam_t_e_ta(eTruck01,14,7,97,48,0).
dadosCam_t_e_ta(eTruck01,14,8,99,38,0).
dadosCam_t_e_ta(eTruck01,14,9,143,66,45).
dadosCam_t_e_ta(eTruck01,14,10,61,17,0).
dadosCam_t_e_ta(eTruck01,14,11,122,57,31).
dadosCam_t_e_ta(eTruck01,14,12,42,10,0).
dadosCam_t_e_ta(eTruck01,14,13,132,58,35).
dadosCam_t_e_ta(eTruck01,14,15,90,44,0).
dadosCam_t_e_ta(eTruck01,14,16,139,61,37).
dadosCam_t_e_ta(eTruck01,14,17,86,38,0).

dadosCam_t_e_ta(eTruck01,15,1,132,51,24).
dadosCam_t_e_ta(eTruck01,15,2,74,30,0).
dadosCam_t_e_ta(eTruck01,15,3,34,8,0).
dadosCam_t_e_ta(eTruck01,15,4,36,12,0).
dadosCam_t_e_ta(eTruck01,15,5,36,14,0).
dadosCam_t_e_ta(eTruck01,15,6,86,44,0).
dadosCam_t_e_ta(eTruck01,15,7,34,16,0).
dadosCam_t_e_ta(eTruck01,15,8,42,13,0).
dadosCam_t_e_ta(eTruck01,15,9,71,35,0).
dadosCam_t_e_ta(eTruck01,15,10,82,36,0).
dadosCam_t_e_ta(eTruck01,15,11,53,25,0).
dadosCam_t_e_ta(eTruck01,15,12,80,38,0).
dadosCam_t_e_ta(eTruck01,15,13,69,18,0).
dadosCam_t_e_ta(eTruck01,15,14,95,45,0).
dadosCam_t_e_ta(eTruck01,15,16,69,29,0).
dadosCam_t_e_ta(eTruck01,15,17,53,17,0).

dadosCam_t_e_ta(eTruck01,16,1,179,68,45).
dadosCam_t_e_ta(eTruck01,16,2,92,37,0).
dadosCam_t_e_ta(eTruck01,16,3,84,31,0).
dadosCam_t_e_ta(eTruck01,16,4,57,16,0).
dadosCam_t_e_ta(eTruck01,16,5,46,18,0).
dadosCam_t_e_ta(eTruck01,16,6,132,60,35).
dadosCam_t_e_ta(eTruck01,16,7,92,42,0).
dadosCam_t_e_ta(eTruck01,16,8,67,23,0).
dadosCam_t_e_ta(eTruck01,16,9,15,3,0).
dadosCam_t_e_ta(eTruck01,16,10,105,46,0).
dadosCam_t_e_ta(eTruck01,16,11,57,28,0).
dadosCam_t_e_ta(eTruck01,16,12,130,52,25).
dadosCam_t_e_ta(eTruck01,16,13,61,15,0).
dadosCam_t_e_ta(eTruck01,16,14,141,61,37).
dadosCam_t_e_ta(eTruck01,16,15,69,29,0).
dadosCam_t_e_ta(eTruck01,16,17,65,24,0).

dadosCam_t_e_ta(eTruck01,17,1,128,46,0).
dadosCam_t_e_ta(eTruck01,17,2,42,14,0).
dadosCam_t_e_ta(eTruck01,17,3,40,11,0).
dadosCam_t_e_ta(eTruck01,17,4,42,13,0).
dadosCam_t_e_ta(eTruck01,17,5,34,10,0).
dadosCam_t_e_ta(eTruck01,17,6,82,38,0).
dadosCam_t_e_ta(eTruck01,17,7,74,30,0).
dadosCam_t_e_ta(eTruck01,17,8,29,6,0).
dadosCam_t_e_ta(eTruck01,17,9,69,31,0).
dadosCam_t_e_ta(eTruck01,17,10,55,24,0).
dadosCam_t_e_ta(eTruck01,17,11,69,29,0).
dadosCam_t_e_ta(eTruck01,17,12,80,30,0).
dadosCam_t_e_ta(eTruck01,17,13,82,23,0).
dadosCam_t_e_ta(eTruck01,17,14,90,38,0).
dadosCam_t_e_ta(eTruck01,17,15,53,18,0).
dadosCam_t_e_ta(eTruck01,17,16,67,25,0).

consult('leasttimealgorithm.pl').
entrega(4439, 20221205, 200, 1, 8, 10).
entrega(4438, 20221205, 150, 9, 7, 9).
entrega(4445, 20221205, 100, 3, 5, 7).
entrega(4443, 20221205, 120, 8, 6, 8).
entrega(4449, 20221205, 300, 11, 15, 20).
entrega(4398, 20221205, 310, 17, 16, 20).
entrega(4432, 20221205, 270, 14, 14, 18).
entrega(4437, 20221205, 180, 12, 9, 11).

entregas(8).

% parameterizacao
getBestRoute([X|_],X).

inicializa(NG,DP,P1,P2):-
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	(retract(populacao(_));true), asserta(populacao(DP)),
	PC is P1/100,
        (retract(prob_cruzamento(_));true),asserta(prob_cruzamento(PC)),
	PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).


gera(X,NG,DP,PC,PM):-
	inicializa(NG,DP,PC,PM),
	gera_populacao(Pop),
	avalia_populacao(Pop,PopAv),
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG), % num geracoes
	gera_geracao(0,NG,PopOrd,L),!,getBestRoute(L,X).

gera_populacao(Pop):-
	populacao(TamPop),
	entregas(NumE),
	findall(ArmazemEntrega,entrega(_,_,_,ArmazemEntrega,_,_),ListaEntregas),
	gera_populacao(TamPop,ListaEntregas,NumE,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaEntregas,NumE,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaEntregas,NumE,Resto),
	gera_individuo(ListaEntregas,NumE,Ind),
	not(member(Ind,Resto)). % para ver se a lista nao tem nenhum repetido


% na populaÃ¯Â¿Â½ao adicionar um individuo da heuristica
gera_populacao(TamPop,ListaEntregas,NumE,L):-
	gera_populacao(TamPop,ListaEntregas,NumE,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaEntregas,NumE,[G|Resto]):-
	NumTemp is NumE + 1,
	random(1,NumTemp,N),
	retira(N,ListaEntregas,G,NovaLista),
	NumE1 is NumE-1,
	gera_individuo(NovaLista,NumE1,Resto).

retira(1,[G|Resto],G,Resto):-!.
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).


% AVALIACAO

calcula_tempo(LC,Final):-
        nome_camiao(LC,Nome),
        bateria_camiao(Nome,CarM,TempR),
        peso_camiao(Nome,PesoC),
        tempo_mais_recarga(LC,CarM,TempR,RecargaC,PesoC,Nome,Custo,ExtraC),
        tempo_entregas(LC,TempoE),
        somar_tudo(RecargaC,ExtraC,TempoE,Custo,Final).

tempo_mais_recarga([_],_,_,0,_,_,0,0):-!.
tempo_mais_recarga([C1,C2|LC],CarM,TempR,RecargaC,PesoC,Nome,Custo,ExtraC):-
        entregas_peso(C1,LE),
        peso_entregas(LE,PesoE),
        PesoC1 is PesoC - PesoE,
        tempo_mais_recarga([C2|LC],CarM,TempR,RecargaC1,PesoC1,Nome,Custo1,ExtraC1),
        (dadosCam_t_e_ta(_,C1,C2,Tempo,Energia,Extra);
        dadosCam_t_e_ta(_,C2,C1,Tempo,Energia,Extra)),
        ExtraC is ExtraC1 + Extra,
        peso_camiao(Nome,PesoB),
        Tempo1 is (PesoC1*Tempo)/PesoB,
        Custo is Custo1+Tempo1,
        Energia1 is (PesoC1*Energia)/PesoB,
        ((CarM - Energia1 < 20, RecargaC is RecargaC1 + ((80 - (CarM - Energia1))*TempR)/60);RecargaC is RecargaC1 + 0).

entregas_peso(C1,LE):- findall(M,entrega(_,_,M,C1,_,_),LE).

%j tempo_entregas
tempo_entregas([],0):-!.
tempo_entregas([HC|LC],TempoE):-
        tempo_entregas(LC,TempoE1),
        buscar_entregas(HC,LI),
        entregas_tempo(LI,TempoT),
        TempoE is TempoE1 + TempoT.

%k buscar_entregas
buscar_entregas(HC,LI):-findall(Id,entrega(Id,_,_,HC,_,_),LI).

%l entregas_tempo
entregas_tempo([],0):-!.
entregas_tempo([HI|LI],TempoT):-
        entregas_tempo(LI,TempoT1),
        entrega(HI,_,_,_,T,TS),
        TempoT is TempoT1 + (T + TS).

%m peso_entregas
peso_entregas([],0):-!.
peso_entregas([HC1|LC1],PesoE):-
        peso_entregas(LC1,PesoE1), PesoE is PesoE1 + HC1.

%n somar_tudo
somar_tudo(RecargaC,ExtraC,TempoE,Custo,Final):- Final is (RecargaC + ExtraC + TempoE + Custo).



%e bateria_camiao (assumindo que o maximo de carga em e 80%)
bateria_camiao(Nome,CarM1,TempR):- carateristicasCam(Nome,_,_,CarM,_,TempR),CarM1 is CarM*(0.8).

%f peso do camiao (assumindo que possui carga maxima)
peso_camiao(Nome,PesoC):- carateristicasCam(Nome,Tara,CapC,_,_,_), PesoC is Tara + CapC.

%nome_camiao
nome_camiao([C1,C2|_],Nome):- dadosCam_t_e_ta(Nome,C1,C2,_,_,_).


%c calcula_custo
% LC -> Lista Cidades

avalia_populacao([],[]):-!.
avalia_populacao([Ind|Resto],[Ind*Custo|Resto1]):-
	calcula_tempo(Ind,Custo),
	avalia_populacao(Resto,Resto1).


% Fim avaliacao

ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


gera_geracao(G,G,Pop,Pop):-!.

gera_geracao(N,G,Pop,L):-
	random_permutation(Pop,LRP),
	cruzamento(LRP,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	selectMelhor(Pop,NPopAv,Res),
	N1 is N+1,
	gera_geracao(N1,G,Res,L).

selectMelhor(Pop,NPop,Res):-
	union(Pop,NPop,PopNPopAv),% fa
	ordena_populacao(PopNPopAv,NPopOrd),
	length(NPopOrd,T),
	length(Pop,N),
	PMax is round(0.3 * N),
	PMin is round(0.2 * N),
	(PMin\==PMax,!,random(PMin,PMax,PN);PN is PMin),	% Percentagem de N a considerar da pop atual (entre 20 a 30 porcento)
	(PN >= 1,!, P is PN; P is 1),
	sublist(NPopOrd,0, P,PElem),
	P2 is P + 1,
	sublist(NPopOrd,P2,T,TPElem),
	t_p_eval(TPElem,Eval),
	ordena_populacao(Eval,EvalOrd),
	Qty is N - P,
	aplica_ordenacao(EvalOrd,TPElem, TPElemOrd),
	sublist(TPElemOrd,0,Qty,BestTP),
	append(PElem,BestTP,Res).

t_p_eval([],[]):-!.
t_p_eval([Ind*Cost|Resto],[Ind*Eval|Resto1]):-
	random(0.0,1.0,Rn),
	Eval is Rn * Cost,
	t_p_eval(Resto,Resto1).

aplica_ordenacao([], _, []):-!.
aplica_ordenacao([EvalInd | Resto], TPElem, [Ind | Resto2]):-
	aplica_ordenacao2(EvalInd, TPElem,Ind),
	aplica_ordenacao(Resto,TPElem, Resto2).

aplica_ordenacao2(Ind*_, [Ind*Eval|_], Ind*Eval):-!.
aplica_ordenacao2(Ind, [_|Resto], Res):-
	aplica_ordenacao2(Ind,Resto,Res).

sublist(L,M,N,S) :- sublist2(1,L,M,N,S).

sublist2(_,[],_,_,[]):-!.
sublist2(I,[X|Xs],M,N,[X|Ys]) :-
    between(M,N,I),
    J is I + 1,
    !, sublist2(J,Xs,M,N,Ys).
sublist2(I,[_|Xs],M,N,Ys) :-
    J is I + 1,
    sublist2(J,Xs,M,N,Ys).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	entregas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]):-!.
cruzamento([Ind*_],[Ind]):-!.
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]):-!.

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	entregas(N),
	E is N - K,
	rr(E,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	entregas(E),
	((N>E,!,N1 is N mod E);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	entregas(NumE),
	R is NumE-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]):-!.

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]):-!.
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).


id_para_nome([],[]):-!.
id_para_nome([HF|LF],LN):- idArmazem(N,HF),
    id_para_nome(LF,TN),
    LN = [N|TN].


inverter([],[]):-!.
inverter([H|T],R):-inverter(T,R1), append(R1,[H],R).
listaCamiao(X):- findall(D,carateristicasCam(D,_,_,_,_,_),X).
listaEntregas(X):- findall(D,entrega(D,_,_,_,_,_),X).

:- dynamic planeamento/2.

atribuir(RESTO,C,E,L):-retractall(planeamento(_,_)),atribuirResto(RESTO,C,E,L),findall(planeamento(X,A),
planeamento(X,A),PIROCA),write(PIROCA).

atribuirResto(0,X,T,T):-!.
atribuirResto(Resto,[HC|TC],[H|T],ListaNovaEntrega):-assertz(planeamento(HC,H)),
Resto1 is Resto-1,atribuirResto(Resto1,TC,T,ListaNovaEntrega)
.

atribuirCamiao([],T,T):-!.
atribuirCamiao([HC|TC],[HE |TE],ENOVA):-asserta(planeamento(HC,HE)),
atribuirCamiao(TC,TE,ENOVA).

recursaoCamiao(_,[]):-!.
recursaoCamiao(C,E):-atribuirCamiao(C,E,ENOVA2),inverter(ENOVA2,ENOVA),recursaoCamiao(C,ENOVA).

camiaoEntregas(B,D,F,G,LF):-retractall(planeamento(_,_)),
listaCamiao(C),
obterTamanhoLista(C,TAMANHOC),
%listaEntregas(E),
gera(V*_,B,D,F,G),
armazensParaEntregas(V,E),
obterTamanhoLista(E,TAMANHOE),
obterResto(TAMANHOE,TAMANHOC,RESTO),
atribuirResto(RESTO,C,E,ListaNovaEntrega),
recursaoCamiao(C,ListaNovaEntrega),
findall(planeamento(X,A),
planeamento(X,A),LF).

obterTamanhoLista([],0).
obterTamanhoLista([_|T],R):-obterTamanhoLista(T,Tamanho),R is Tamanho+1.

obterResto(E,C,RESTO):-RESTO is (E mod C).

%armazensParaEntregas([],[]).
%armazensParaEntregas([H|T],R):-entrega(X,_,_,H,_,_),append(X,R1,R),armazensParaEntregas(T,R1).
%
armazensParaEntregas(StoreList, ResultList) :-
    armazensParaEntregas(StoreList, [], ResultList).

armazensParaEntregas([], Acc, Acc).
armazensParaEntregas([H|T], Acc, ResultList) :-
    entrega(X, _, _, H, _, _),
    armazensParaEntregas(T,[X|Acc], ResultList).

%acoesEntregas(EntregaID,Lista,Acao,B,D,F,G):-
	%gera(V*_,B,D,F,G),
	%armazensParaEntregas(V,E),
	%Entrega = entrega(EntregaID,_,_,_,_,_),
	%write(Entrega),
	%(Acao = 'Add' -> append(E,Entrega,Lista);
	%Acao = 'Delete' , delete(E,Entrega,Lista)),
	%write(%Entrega),nl,
	%write(%Lista).

acoesEntregas(EntregaID, Lista, Acao, B, D, F, G) :-
  gera(V*_, B, D, F, G),
  armazensParaEntregas(V,E),
  (   Acao = 'Add'
  -> (member(EntregaID,E) -> write('The delivery you pretend to add is already in the list.') ; (not(member(EntregaID,E))) -> Lista = [EntregaID|E])
  ;   Acao = 'Delete'
  -> ((member(EntregaID,E) -> delete(E, EntregaID, Lista)) ; (not(member(EntregaID,E))) -> write('The delivery is not in the list.'))
  ;   write('Please Insert a valid action')
  ).

