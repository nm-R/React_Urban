-- =========================
-- USERS (IDs 1-5)
-- =========================

INSERT INTO users (name, email, password, role)
VALUES 
  ('Admin UrbanoPlus', 'admin@urbanoplus.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXhOoAVS2', 'ADMIN'),
  ('João Silva', 'joao@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXhOoAVS2', 'USER'),
  ('Maria Souza', 'maria@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXhOoAVS2', 'USER'),
  ('Carlos Oliveira', 'carlos@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXhOoAVS2', 'USER'),
  ('Ana Paula', 'ana@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXhOoAVS2', 'USER')
ON CONFLICT (email) DO NOTHING;
-- =========================
-- OCCURRENCES (1–20) ESPALHADAS
-- =========================

INSERT INTO occurrences (
title, description, category, latitude, longitude, radius,
status, rejection_reason, created_at, approved_at, expires_at, user_id
) VALUES

('Buraco Av. Domingos Camerlingo Caló',
 'Buraco grande próximo ao fluxo principal.',
 'INFRASTRUCTURE', -22.9738, -49.8698, 80, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 2),

('Semáforo Rua Cardoso Ribeiro',
 'Semáforo apagado no cruzamento.',
 'TRAFFIC', -22.9725, -49.8719, 60, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 3),

('Lixo Jardim Matilde (zona norte)',
 'Acúmulo de lixo em área residencial.',
 'SANITATION', -22.9689, -49.8745, 120, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 4),

('Iluminação apagada Vila Odilon',
 'Rua totalmente escura à noite.',
 'INFRASTRUCTURE', -22.9789, -49.8682, 140, 'PENDING', NULL, NOW(), NULL, NULL, 5),

('Esgoto Vila Brasil (leste)',
 'Vazamento forte de esgoto.',
 'SANITATION', -22.9768, -49.8669, 100, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 2),

('Árvore caída saída para Jacinto Sá',
 'Árvore bloqueando estrada de acesso.',
 'ENVIRONMENT', -22.9815, -49.8788, 150, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 3),

('Barulho centro comercial',
 'Som alto durante madrugada.',
 'OTHER', -22.9742, -49.8715, 100, 'PENDING', NULL, NOW(), NULL, NULL, 4),

('Assalto relatado Vila Brasil',
 'Tentativa de assalto à noite.',
 'SECURITY', -22.9779, -49.8675, 90, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 5),

('Enchente Rua Bahia (zona sul)',
 'Rua alagada após chuva.',
 'SANITATION', -22.9798, -49.8729, 180, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 2),

('Buraco bairro Helena Braz',
 'Buraco profundo em rua residencial.',
 'INFRASTRUCTURE', -22.9655, -49.8768, 70, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 3),

('Semáforo Av. Gaspar Ricardo',
 'Confusão no trânsito por falha.',
 'TRAFFIC', -22.9751, -49.8733, 120, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 4),

('Vazamento água Jardim Paulista',
 'Água escorrendo continuamente.',
 'SANITATION', -22.9728, -49.8749, 90, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 5),

('Movimentação suspeita COHAB',
 'Atividade estranha à noite.',
 'SECURITY', -22.9852, -49.8708, 110, 'PENDING', NULL, NOW(), NULL, NULL, 2),

('Calçada quebrada Vila Musa',
 'Pedestres andando na rua.',
 'INFRASTRUCTURE', -22.9875, -49.8760, 80, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 3),

('Fumaça área rural Ourinhos',
 'Queimada em região afastada.',
 'ENVIRONMENT', -22.9930, -49.8835, 300, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 4),

('Trânsito saída SP-278',
 'Congestionamento na rodovia.',
 'TRAFFIC', -22.9881, -49.8820, 250, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 5),

('Entulho Jardim São Carlos',
 'Descarte irregular de lixo.',
 'OTHER', -22.9761, -49.8792, 130, 'PENDING', NULL, NOW(), NULL, NULL, 2),

('Bueiro entupido Vila Perino',
 'Água acumulando após chuva leve.',
 'INFRASTRUCTURE', -22.9704, -49.8689, 70, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 3),

('Muro caído Vila Brasil oeste',
 'Estrutura desabou parcialmente.',
 'INFRASTRUCTURE', -22.9782, -49.8658, 85, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 4),

('Quebra-molas mal sinalizado centro',
 'Perigo para veículos à noite.',
 'ENVIRONMENT', -22.9735, -49.8710, 60, 'APPROVED', NULL, NOW(), NOW(), NOW() + INTERVAL '1 day', 5);


-- =========================
-- COMMENTS (0–2 por ocorrência)
-- =========================

INSERT INTO comments (text, occurrence_id, user_id, created_at) VALUES

-- 1 (2)
('Quase estourou pneu aqui.', 1, 3, NOW()),
('Muito perigoso.', 1, 4, NOW()),

-- 2 (1)
('Semáforo confuso mesmo.', 2, 2, NOW()),

-- 3 (2)
('Cheiro forte aqui.', 3, 5, NOW()),
('Precisa coleta urgente.', 3, 3, NOW()),

-- 4 (0)

-- 5 (1)
('Isso já vem de dias.', 5, 2, NOW()),

-- 6 (2)
('Árvore ainda está lá?', 6, 4, NOW()),
('Bloqueando totalmente.', 6, 5, NOW()),

-- 7 (0)

-- 8 (1)
('Muito perigoso isso.', 8, 2, NOW()),

-- 9 (2)
('Sempre alaga aqui.', 9, 3, NOW()),
('Problema antigo.', 9, 4, NOW()),

-- 10 (1)
('Buraco grande mesmo.', 10, 5, NOW()),

-- 11 (2)
('Trânsito sempre ruim aqui.', 11, 2, NOW()),
('Precisa ajuste semafórico.', 11, 3, NOW()),

-- 12 (1)
('Vazamento constante.', 12, 4, NOW()),

-- 13 (0)

-- 14 (1)
('Calçada inutilizável.', 14, 2, NOW()),

-- 15 (2)
('Fumaça chegou longe.', 15, 3, NOW()),
('Preocupante isso.', 15, 4, NOW()),

-- 16 (2)
('Rodovia travada sempre.', 16, 5, NOW()),
('Horário de pico impossível.', 16, 2, NOW()),

-- 17 (0)

-- 18 (1)
('Bueiro entope sempre.', 18, 3, NOW()),

-- 19 (2)
('Muro caiu após chuva forte.', 19, 4, NOW()),
('Perigo para pedestres.', 19, 5, NOW()),

-- 20 (1)
('Muito perigoso à noite.', 20, 2, NOW());