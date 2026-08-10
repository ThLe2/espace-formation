/* ---------------------------------------------------------------
   Mode aperçu — index.html?demo
   Simule les réponses de Supabase pour juger l'interface sans rien
   configurer ni déployer. N'a aucun effet en usage normal.
   Ce fichier peut être supprimé une fois la mise en service faite.
   --------------------------------------------------------------- */
window.LMS_CLIENT_DEMO = function () {

  var jour = (function () {
    var d = new Date(), z = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate());
  })();
  var dans = function (n) {
    var d = new Date(); d.setDate(d.getDate() + n);
    var z = function (x) { return (x < 10 ? '0' : '') + x; };
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate());
  };

  var base = {
    stagiaire: { id: 'demo', prenom: 'Thao', nom: 'BATAILLE' },
    sessions: [
      { id: 1, libelle: 'Fondamentaux de la relation client 1/4', da_id: 1,
        date_debut: jour, date_fin: jour, heure_debut: '08:30:00',
        heure_fin: '16:30:00', heure_cloture: '18:30:00', est_fenetre: false },
      { id: 2, libelle: 'Éthique et déontologie', da_id: 2,
        date_debut: dans(3), date_fin: dans(3), heure_debut: '08:30:00',
        heure_fin: '16:30:00', heure_cloture: '18:30:00', est_fenetre: false },
      { id: 3, libelle: 'Réglementation de la VAD', da_id: 3,
        date_debut: dans(7), date_fin: dans(7), heure_debut: '08:30:00',
        heure_fin: '16:30:00', heure_cloture: '18:30:00', est_fenetre: false }
    ],
    etapes: [
      { id: 11, ref: 'capsule-01', ordre: 1, type: 'video', titre: 'Capsule : ce qu\'attend un client qui appelle',
        bloquante: true, regle: { couverture_min: 0.95, tolerance_saut_s: 5 },
        media_url: 'exemple/capsule-demo.mp4', duree_s: 120 },
      { id: 12, ref: 'memo-01', ordre: 2, type: 'document', titre: 'Mémo du module',
        bloquante: true, regle: {}, media_url: '#', duree_s: null },
      { id: 13, ref: 'exo-01', ordre: 3, type: 'exercice', titre: 'Reformuler une demande floue',
        bloquante: true, regle: {}, media_url: '', duree_s: null },
      { id: 14, ref: 'qcm-01', ordre: 4, type: 'qcm', titre: 'Questionnaire de validation',
        bloquante: true, regle: { restituer_corrige: true }, media_url: '', duree_s: null },
      { id: 15, ref: 'cas-01', ordre: 5, type: 'cas_pratique', titre: 'Cas pratique : le client mécontent',
        bloquante: false, regle: {}, media_url: '', duree_s: null }
    ],
    questions: [
      { id: 1, ref: 'q01', ordre: 1, type: 'unique', points: 1,
        enonce: 'Que fait-on en premier lorsqu\'un client exprime une réclamation ?',
        propositions: [
          { cle: 'a', texte: 'Proposer immédiatement un geste commercial' },
          { cle: 'b', texte: 'Laisser le client exposer sa demande sans l\'interrompre' },
          { cle: 'c', texte: 'Transférer l\'appel au service concerné' }] },
      { id: 2, ref: 'q02', ordre: 2, type: 'multiple', points: 2,
        enonce: 'Quels éléments relèvent de l\'écoute active ?',
        propositions: [
          { cle: 'a', texte: 'La reformulation' },
          { cle: 'b', texte: 'Le questionnement ouvert' },
          { cle: 'c', texte: 'L\'anticipation de la réponse' },
          { cle: 'd', texte: 'La prise de notes' }] },
      { id: 3, ref: 'q03', ordre: 3, type: 'ouverte', points: 3,
        enonce: 'Expliquez ce qui distingue une réclamation d\'un simple mécontentement.',
        propositions: [] }
    ],
    corrige: { q01: ['b'], q02: ['a', 'b', 'd'] },
    explications: {
      q01: 'Laisser le client aller au bout de son propos désamorce la tension et évite de traiter la mauvaise demande.',
      q02: 'L\'anticipation de la réponse est l\'inverse de l\'écoute : elle conduit à répondre à côté.'
    },
    progressions: [],
    tentatives: []
  };

  function reponse(data) {
    var p = Promise.resolve({ data: data, error: null });
    p.eq = function () { return this; };
    p.order = function () { return this; };
    p.limit = function () { return this; };
    return p;
  }
  function chainable(data) {
    var o = {
      then: function (f, g) { return Promise.resolve({ data: data, error: null }).then(f, g); },
      eq: function () { return o; }, order: function () { return o; },
      limit: function () { return o; }, select: function () { return o; }
    };
    return o;
  }
  function erreur(msg) {
    return { then: function (f) { return Promise.resolve({ data: null, error: { message: msg } }).then(f); } };
  }

  function segmentsDe(id) {
    var p = base.progressions.filter(function (x) { return x.etape_id === id; })[0];
    return (p && p.segments) || [];
  }
  function poser(id, maj) {
    var p = base.progressions.filter(function (x) { return x.etape_id === id; })[0];
    if (!p) { p = { etape_id: id, statut: 'en_cours', segments: [], duree_vue_s: 0 }; base.progressions.push(p); }
    Object.keys(maj).forEach(function (k) { p[k] = maj[k]; });
    return p;
  }

  var api = {
    auth: {
      signInWithPassword: function () { return Promise.resolve({ data: {}, error: null }); },
      signOut: function () { return Promise.resolve({}); },
      getSession: function () { return Promise.resolve({ data: { session: { user: { id: 'demo' } } } }); }
    },
    schema: function (nom) {
      return {
        from: function (table) {
          return {
            select: function () {
              if (table === 'stagiaires') return chainable([base.stagiaire]);
              if (table === 'sessions') return chainable(base.sessions);
              if (table === 'etapes') return chainable(base.etapes);
              if (table === 'progressions') return chainable(base.progressions);
              if (table === 'questions') return chainable(base.questions);
              if (table === 'tentatives') return chainable(base.tentatives);
              return chainable([]);
            }
          };
        },
        rpc: function (nomFn, args) {
          if (nomFn === 'enregistrer_connexion') return reponse({ session_id: args.p_session_id });

          if (nomFn === 'valider_etape') {
            poser(args.p_etape_id, { statut: 'validee' });
            return reponse(null);
          }

          if (nomFn === 'enregistrer_visionnage') {
            var etape = base.etapes.filter(function (e) { return e.id === args.p_etape_id; })[0];
            var tol = (etape.regle || {}).tolerance_saut_s || 5;
            var segs = segmentsDe(args.p_etape_id).slice();
            var f = 0;
            segs.slice().sort(function (a, b) { return a[0] - b[0]; })
                .forEach(function (s) { if (s[0] <= f + tol) f = Math.max(f, s[1]); });
            if (args.p_debut_s > f + tol) {
              return erreur('Avance rapide détectée : visionnage continu jusqu\'à ' + f + ' s seulement.');
            }
            segs.push([args.p_debut_s, args.p_fin_s]);
            segs.sort(function (a, b) { return a[0] - b[0]; });
            var fus = [], cur = null;
            segs.forEach(function (s) {
              if (!cur) { cur = s.slice(); return; }
              if (s[0] <= cur[1]) cur[1] = Math.max(cur[1], s[1]);
              else { fus.push(cur); cur = s.slice(); }
            });
            if (cur) fus.push(cur);
            var vu = fus.reduce(function (t, s) { return t + (s[1] - s[0]); }, 0);
            var couv = vu / Math.max(1, etape.duree_s);
            var seuil = (etape.regle || {}).couverture_min || 0.95;
            poser(args.p_etape_id, {
              segments: fus, duree_vue_s: vu,
              statut: couv >= seuil ? 'validee' : 'en_cours'
            });
            return reponse({ couverture: couv, seuil: seuil, validee: couv >= seuil, duree_vue_s: vu });
          }

          if (nomFn === 'soumettre') {
            if (base.tentatives.filter(function (t) { return t.etape_id === args.p_etape_id; }).length) {
              return erreur('Une tentative existe déjà pour cette étape.');
            }
            var score = 0, bareme = 0, detail = [];
            base.questions.forEach(function (q) {
              bareme += q.points;
              var att = base.corrige[q.ref];
              if (!att) { detail.push({ ref: q.ref, juste: null, explication: null }); return; }
              var don = args.p_reponses[q.ref] || [];
              var bonnes = don.filter(function (c) { return att.indexOf(c) >= 0; }).length;
              var fausses = don.filter(function (c) { return att.indexOf(c) < 0; }).length;
              var juste = fausses === 0 && bonnes === att.length;
              if (juste) score += q.points;
              else if (fausses === 0 && bonnes) score += Math.round(q.points * bonnes / att.length * 100) / 100;
              detail.push({ ref: q.ref, juste: juste, explication: base.explications[q.ref] || null });
            });
            base.tentatives.push({ etape_id: args.p_etape_id, score_auto: score, bareme_total: bareme });
            poser(args.p_etape_id, { statut: 'validee' });
            return reponse({ score: score, bareme: bareme,
                             pourcentage: Math.round(score / bareme * 1000) / 10, detail: detail });
          }
          return reponse(null);
        }
      };
    }
  };
  return api;
};
