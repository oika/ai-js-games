const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const PIXEL_SIZE = 2;

class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 120;
        this.width = 32;
        this.height = 64;
        this.health = 100;
        this.maxHealth = 100;
        this.speed = 5;
        this.attacking = false;
        this.attackType = null;
        this.attackFrame = 0;
        this.facing = 1;
        this.invulnerable = false;
        this.invulnerableTime = 0;
        this.walkFrame = 0;
        this.isMoving = false;
    }

    update() {
        this.isMoving = false;
        
        if (keys.ArrowLeft) {
            this.x -= this.speed;
            this.facing = -1;
            this.isMoving = true;
        }
        if (keys.ArrowRight) {
            this.x += this.speed;
            this.facing = 1;
            this.isMoving = true;
        }

        if (this.isMoving) {
            this.walkFrame = (this.walkFrame + 1) % 20;
        } else {
            this.walkFrame = 0;
        }

        this.x = Math.max(this.width/2, Math.min(canvas.width - this.width/2, this.x));

        if (this.attacking) {
            this.attackFrame++;
            
            // Launch projectile on special attack
            if (this.attackType === 'special' && this.attackFrame === 10) {
                projectiles.push(new Projectile(
                    this.x + this.facing * 20,
                    this.y - 16,
                    this.facing
                ));
            }
            
            if (this.attackFrame > 15) {
                this.attacking = false;
                this.attackType = null;
                this.attackFrame = 0;
            }
        }

        if (this.invulnerable) {
            this.invulnerableTime--;
            if (this.invulnerableTime <= 0) {
                this.invulnerable = false;
            }
        }
    }

    attack(type) {
        if (!this.attacking) {
            this.attacking = true;
            this.attackType = type;
            this.attackFrame = 0;
        }
    }

    takeDamage(amount) {
        if (!this.invulnerable) {
            this.health -= amount;
            this.invulnerable = true;
            this.invulnerableTime = 60;
            updateHealthBar();
        }
    }

    drawPixel(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }

    draw() {
        ctx.save();
        
        if (this.invulnerable && Math.floor(this.invulnerableTime / 5) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }

        const px = Math.floor(this.x - 16);
        const py = Math.floor(this.y - 32);
        
        ctx.translate(px, py);
        
        if (this.facing === -1) {
            ctx.translate(32, 0);
            ctx.scale(-1, 1);
        }

        const legOffset = this.isMoving ? Math.sin(this.walkFrame * 0.3) * 2 : 0;

        this.drawPixel(14, 4, '#2a1f1a');
        this.drawPixel(15, 4, '#2a1f1a');
        this.drawPixel(16, 4, '#2a1f1a');
        this.drawPixel(17, 4, '#2a1f1a');
        this.drawPixel(13, 5, '#2a1f1a');
        this.drawPixel(14, 5, '#2a1f1a');
        this.drawPixel(15, 5, '#2a1f1a');
        this.drawPixel(16, 5, '#2a1f1a');
        this.drawPixel(17, 5, '#2a1f1a');
        this.drawPixel(18, 5, '#2a1f1a');
        
        this.drawPixel(13, 6, '#f4c896');
        this.drawPixel(14, 6, '#f4c896');
        this.drawPixel(15, 6, '#f4c896');
        this.drawPixel(16, 6, '#f4c896');
        this.drawPixel(17, 6, '#f4c896');
        this.drawPixel(18, 6, '#f4c896');
        
        this.drawPixel(13, 7, '#f4c896');
        this.drawPixel(14, 7, '#f4c896');
        this.drawPixel(15, 7, '#f4c896');
        this.drawPixel(16, 7, '#f4c896');
        this.drawPixel(17, 7, '#f4c896');
        this.drawPixel(18, 7, '#f4c896');
        
        this.drawPixel(14, 8, '#f4c896');
        this.drawPixel(15, 8, '#f4c896');
        this.drawPixel(16, 8, '#f4c896');
        this.drawPixel(17, 8, '#f4c896');
        
        this.drawPixel(17, 7, '#000');
        this.drawPixel(17, 8, '#000');
        
        this.drawPixel(14, 9, '#f4c896');
        this.drawPixel(15, 9, '#f4c896');
        this.drawPixel(16, 9, '#f4c896');
        this.drawPixel(17, 9, '#f4c896');
        
        for (let i = 0; i < 8; i++) {
            this.drawPixel(12, 11 + i, '#2563eb');
            this.drawPixel(13, 11 + i, '#2563eb');
            this.drawPixel(14, 11 + i, '#2563eb');
            this.drawPixel(15, 11 + i, '#2563eb');
            this.drawPixel(16, 11 + i, '#2563eb');
            this.drawPixel(17, 11 + i, '#2563eb');
            this.drawPixel(18, 11 + i, '#2563eb');
            this.drawPixel(19, 11 + i, '#2563eb');
        }
        
        if (!this.attacking) {
            this.drawPixel(11, 12, '#f4c896');
            this.drawPixel(10, 13, '#f4c896');
            this.drawPixel(10, 14, '#f4c896');
            this.drawPixel(11, 15, '#f4c896');
            
            this.drawPixel(20, 12, '#f4c896');
            this.drawPixel(21, 13, '#f4c896');
            this.drawPixel(21, 14, '#f4c896');
            this.drawPixel(20, 15, '#f4c896');
        }
        
        for (let i = 0; i < 12; i++) {
            this.drawPixel(13, 19 + i + (i < 6 ? 0 : legOffset), '#1e3a8a');
            this.drawPixel(14, 19 + i + (i < 6 ? 0 : legOffset), '#1e3a8a');
            
            this.drawPixel(17, 19 + i + (i < 6 ? 0 : -legOffset), '#1e3a8a');
            this.drawPixel(18, 19 + i + (i < 6 ? 0 : -legOffset), '#1e3a8a');
        }
        
        this.drawPixel(12, 31 + legOffset, '#1f2937');
        this.drawPixel(13, 31 + legOffset, '#1f2937');
        this.drawPixel(14, 31 + legOffset, '#1f2937');
        this.drawPixel(15, 31 + legOffset, '#1f2937');
        
        this.drawPixel(16, 31 - legOffset, '#1f2937');
        this.drawPixel(17, 31 - legOffset, '#1f2937');
        this.drawPixel(18, 31 - legOffset, '#1f2937');
        this.drawPixel(19, 31 - legOffset, '#1f2937');

        if (this.attacking) {
            if (this.attackType === 'punch') {
                // Extended arm
                for (let i = 0; i < 6; i++) {
                    this.drawPixel(20 + i, 12, '#2563eb');
                    this.drawPixel(20 + i, 13, '#2563eb');
                }
                // Fist
                this.drawPixel(26, 11, '#f4c896');
                this.drawPixel(27, 11, '#f4c896');
                this.drawPixel(28, 11, '#f4c896');
                this.drawPixel(26, 12, '#f4c896');
                this.drawPixel(27, 12, '#f4c896');
                this.drawPixel(28, 12, '#f4c896');
                this.drawPixel(29, 12, '#f4c896');
                this.drawPixel(26, 13, '#f4c896');
                this.drawPixel(27, 13, '#f4c896');
                this.drawPixel(28, 13, '#f4c896');
                this.drawPixel(29, 13, '#f4c896');
                this.drawPixel(26, 14, '#f4c896');
                this.drawPixel(27, 14, '#f4c896');
                this.drawPixel(28, 14, '#f4c896');
                // Impact effect
                if (this.attackFrame > 5) {
                    ctx.fillStyle = '#fff700';
                    ctx.globalAlpha = 0.6;
                    ctx.fillRect(30 * PIXEL_SIZE, 11 * PIXEL_SIZE, 8, 8);
                    ctx.globalAlpha = 1;
                }
            } else if (this.attackType === 'kick') {
                // Extended leg
                for (let i = 0; i < 10; i++) {
                    this.drawPixel(20 + i, 22, '#1e3a8a');
                    this.drawPixel(20 + i, 23, '#1e3a8a');
                    this.drawPixel(20 + i, 24, '#1e3a8a');
                    this.drawPixel(20 + i, 25, '#1e3a8a');
                }
                // Foot
                this.drawPixel(30, 22, '#1f2937');
                this.drawPixel(31, 22, '#1f2937');
                this.drawPixel(32, 22, '#1f2937');
                this.drawPixel(30, 23, '#1f2937');
                this.drawPixel(31, 23, '#1f2937');
                this.drawPixel(32, 23, '#1f2937');
                this.drawPixel(33, 23, '#1f2937');
                this.drawPixel(30, 24, '#1f2937');
                this.drawPixel(31, 24, '#1f2937');
                this.drawPixel(32, 24, '#1f2937');
                this.drawPixel(33, 24, '#1f2937');
                this.drawPixel(30, 25, '#1f2937');
                this.drawPixel(31, 25, '#1f2937');
                this.drawPixel(32, 25, '#1f2937');
                // Impact effect
                if (this.attackFrame > 5) {
                    ctx.fillStyle = '#ff6600';
                    ctx.globalAlpha = 0.6;
                    ctx.fillRect(34 * PIXEL_SIZE, 22 * PIXEL_SIZE, 10, 10);
                    ctx.globalAlpha = 1;
                }
            } else if (this.attackType === 'special') {
                // Charging effect
                this.drawPixel(20, 12, '#f4c896');
                this.drawPixel(21, 12, '#f4c896');
                this.drawPixel(22, 12, '#f4c896');
                
                if (this.attackFrame > 8) {
                    // Launch projectile (handled separately)
                    ctx.fillStyle = '#00ffff';
                    ctx.globalAlpha = 0.8;
                    for (let i = 0; i < 3; i++) {
                        ctx.fillRect((24 + i * 2) * PIXEL_SIZE, 12 * PIXEL_SIZE, 4, 4);
                    }
                    ctx.globalAlpha = 1;
                }
            }
        }

        ctx.restore();
    }

    getAttackBox() {
        if (!this.attacking) return null;
        
        const attackRange = this.attackType === 'special' ? 60 : 40;
        const attackX = this.facing === 1 ? this.x + 16 : this.x - 16 - attackRange;
        
        return {
            x: attackX,
            y: this.y - 20,
            width: attackRange + (this.attackType === 'kick' ? 10 : 0),
            height: 40
        };
    }
}

class Enemy {
    constructor(side) {
        this.x = side === 'left' ? -30 : canvas.width + 30;
        this.y = canvas.height - 120;
        this.width = 32;
        this.height = 64;
        this.type = Math.floor(Math.random() * 4);
        this.health = [30, 40, 50, 35][this.type];
        this.speed = [2, 1.5, 1, 2.5][this.type];
        this.damage = [10, 15, 20, 8][this.type];
        this.attackCooldown = 0;
        this.facing = side === 'left' ? 1 : -1;
        this.score = [100, 150, 200, 120][this.type];
        this.walkFrame = 0;
    }

    update(player) {
        this.x += this.speed * this.facing;
        this.walkFrame = (this.walkFrame + 1) % 20;

        const distToPlayer = Math.abs(this.x - player.x);
        
        if (distToPlayer < 50 && this.attackCooldown <= 0) {
            player.takeDamage(this.damage);
            this.attackCooldown = 60;
        }

        if (this.attackCooldown > 0) {
            this.attackCooldown--;
        }
    }

    takeDamage(amount) {
        this.health -= amount;
    }

    drawPixel(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }

    draw() {
        ctx.save();
        
        const px = Math.floor(this.x - 16);
        const py = Math.floor(this.y - 32);
        
        ctx.translate(px, py);
        
        if (this.facing === -1) {
            ctx.translate(32, 0);
            ctx.scale(-1, 1);
        }

        const legOffset = Math.sin(this.walkFrame * 0.3) * 2;

        if (this.type === 0) {
            this.drawPixel(14, 3, '#8b4513');
            this.drawPixel(15, 3, '#8b4513');
            this.drawPixel(16, 3, '#8b4513');
            this.drawPixel(17, 3, '#8b4513');
            this.drawPixel(13, 4, '#8b4513');
            this.drawPixel(14, 4, '#8b4513');
            this.drawPixel(15, 4, '#8b4513');
            this.drawPixel(16, 4, '#8b4513');
            this.drawPixel(17, 4, '#8b4513');
            this.drawPixel(18, 4, '#8b4513');
            
            for (let i = 5; i < 10; i++) {
                this.drawPixel(13, i, '#d4a373');
                this.drawPixel(14, i, '#d4a373');
                this.drawPixel(15, i, '#d4a373');
                this.drawPixel(16, i, '#d4a373');
                this.drawPixel(17, i, '#d4a373');
                this.drawPixel(18, i, '#d4a373');
            }
            
            this.drawPixel(14, 7, '#000');
            this.drawPixel(17, 7, '#000');
            
            for (let i = 0; i < 8; i++) {
                this.drawPixel(12, 11 + i, '#8b0000');
                this.drawPixel(13, 11 + i, '#8b0000');
                this.drawPixel(14, 11 + i, '#8b0000');
                this.drawPixel(15, 11 + i, '#8b0000');
                this.drawPixel(16, 11 + i, '#8b0000');
                this.drawPixel(17, 11 + i, '#8b0000');
                this.drawPixel(18, 11 + i, '#8b0000');
                this.drawPixel(19, 11 + i, '#8b0000');
            }
            
            this.drawPixel(11, 12, '#d4a373');
            this.drawPixel(10, 13, '#d4a373');
            this.drawPixel(10, 14, '#d4a373');
            this.drawPixel(11, 15, '#d4a373');
            
            this.drawPixel(20, 12, '#d4a373');
            this.drawPixel(21, 13, '#d4a373');
            this.drawPixel(21, 14, '#d4a373');
            this.drawPixel(20, 15, '#d4a373');
            
        } else if (this.type === 1) {
            this.drawPixel(15, 2, '#000');
            this.drawPixel(16, 2, '#000');
            this.drawPixel(14, 3, '#000');
            this.drawPixel(15, 3, '#000');
            this.drawPixel(16, 3, '#000');
            this.drawPixel(17, 3, '#000');
            this.drawPixel(13, 4, '#000');
            this.drawPixel(18, 4, '#000');
            
            for (let i = 5; i < 10; i++) {
                this.drawPixel(13, i, '#8fbc8f');
                this.drawPixel(14, i, '#8fbc8f');
                this.drawPixel(15, i, '#8fbc8f');
                this.drawPixel(16, i, '#8fbc8f');
                this.drawPixel(17, i, '#8fbc8f');
                this.drawPixel(18, i, '#8fbc8f');
            }
            
            this.drawPixel(14, 7, '#000');
            this.drawPixel(17, 7, '#000');
            
            for (let i = 0; i < 10; i++) {
                this.drawPixel(11, 11 + i, '#2e8b57');
                this.drawPixel(12, 11 + i, '#2e8b57');
                this.drawPixel(13, 11 + i, '#2e8b57');
                this.drawPixel(14, 11 + i, '#2e8b57');
                this.drawPixel(15, 11 + i, '#2e8b57');
                this.drawPixel(16, 11 + i, '#2e8b57');
                this.drawPixel(17, 11 + i, '#2e8b57');
                this.drawPixel(18, 11 + i, '#2e8b57');
                this.drawPixel(19, 11 + i, '#2e8b57');
                this.drawPixel(20, 11 + i, '#2e8b57');
            }
            
            this.drawPixel(10, 13, '#8fbc8f');
            this.drawPixel(9, 14, '#8fbc8f');
            this.drawPixel(9, 15, '#8fbc8f');
            this.drawPixel(10, 16, '#8fbc8f');
            
            this.drawPixel(21, 13, '#8fbc8f');
            this.drawPixel(22, 14, '#8fbc8f');
            this.drawPixel(22, 15, '#8fbc8f');
            this.drawPixel(21, 16, '#8fbc8f');
            
        } else if (this.type === 2) {
            this.drawPixel(13, 5, '#808080');
            this.drawPixel(14, 5, '#808080');
            this.drawPixel(15, 5, '#808080');
            this.drawPixel(16, 5, '#808080');
            this.drawPixel(17, 5, '#808080');
            this.drawPixel(18, 5, '#808080');
            this.drawPixel(12, 6, '#808080');
            this.drawPixel(19, 6, '#808080');
            
            for (let i = 6; i < 10; i++) {
                this.drawPixel(13, i, '#ffb6c1');
                this.drawPixel(14, i, '#ffb6c1');
                this.drawPixel(15, i, '#ffb6c1');
                this.drawPixel(16, i, '#ffb6c1');
                this.drawPixel(17, i, '#ffb6c1');
                this.drawPixel(18, i, '#ffb6c1');
            }
            
            this.drawPixel(14, 7, '#ff0000');
            this.drawPixel(17, 7, '#ff0000');
            
            for (let i = 0; i < 10; i++) {
                this.drawPixel(10, 11 + i, '#483d8b');
                this.drawPixel(11, 11 + i, '#483d8b');
                this.drawPixel(12, 11 + i, '#483d8b');
                this.drawPixel(13, 11 + i, '#483d8b');
                this.drawPixel(14, 11 + i, '#483d8b');
                this.drawPixel(15, 11 + i, '#483d8b');
                this.drawPixel(16, 11 + i, '#483d8b');
                this.drawPixel(17, 11 + i, '#483d8b');
                this.drawPixel(18, 11 + i, '#483d8b');
                this.drawPixel(19, 11 + i, '#483d8b');
                this.drawPixel(20, 11 + i, '#483d8b');
                this.drawPixel(21, 11 + i, '#483d8b');
            }
            
            this.drawPixel(14, 18, '#ffd700');
            this.drawPixel(15, 18, '#ffd700');
            this.drawPixel(16, 18, '#ffd700');
            this.drawPixel(17, 18, '#ffd700');
            
        } else if (this.type === 3) {
            for (let i = 4; i < 10; i++) {
                this.drawPixel(13, i, '#f5deb3');
                this.drawPixel(14, i, '#f5deb3');
                this.drawPixel(15, i, '#f5deb3');
                this.drawPixel(16, i, '#f5deb3');
                this.drawPixel(17, i, '#f5deb3');
                this.drawPixel(18, i, '#f5deb3');
            }
            
            this.drawPixel(14, 6, '#000');
            this.drawPixel(17, 6, '#000');
            
            this.drawPixel(11, 6, '#ff6347');
            this.drawPixel(12, 6, '#ff6347');
            this.drawPixel(19, 6, '#ff6347');
            this.drawPixel(20, 6, '#ff6347');
            
            for (let i = 0; i < 8; i++) {
                this.drawPixel(12, 11 + i, '#ff6347');
                this.drawPixel(13, 11 + i, '#ff6347');
                this.drawPixel(14, 11 + i, '#ff6347');
                this.drawPixel(15, 11 + i, '#ff6347');
                this.drawPixel(16, 11 + i, '#ff6347');
                this.drawPixel(17, 11 + i, '#ff6347');
                this.drawPixel(18, 11 + i, '#ff6347');
                this.drawPixel(19, 11 + i, '#ff6347');
            }
            
            this.drawPixel(11, 13, '#f5deb3');
            this.drawPixel(10, 14, '#f5deb3');
            this.drawPixel(10, 15, '#f5deb3');
            
            this.drawPixel(20, 13, '#f5deb3');
            this.drawPixel(21, 14, '#f5deb3');
            this.drawPixel(21, 15, '#f5deb3');
        }

        for (let i = 0; i < 12; i++) {
            this.drawPixel(13, 19 + i + (i < 6 ? 0 : legOffset), '#000');
            this.drawPixel(14, 19 + i + (i < 6 ? 0 : legOffset), '#000');
            
            this.drawPixel(17, 19 + i + (i < 6 ? 0 : -legOffset), '#000');
            this.drawPixel(18, 19 + i + (i < 6 ? 0 : -legOffset), '#000');
        }
        
        this.drawPixel(12, 31 + legOffset, '#333');
        this.drawPixel(13, 31 + legOffset, '#333');
        this.drawPixel(14, 31 + legOffset, '#333');
        this.drawPixel(15, 31 + legOffset, '#333');
        
        this.drawPixel(16, 31 - legOffset, '#333');
        this.drawPixel(17, 31 - legOffset, '#333');
        this.drawPixel(18, 31 - legOffset, '#333');
        this.drawPixel(19, 31 - legOffset, '#333');

        ctx.restore();
    }

    isOffScreen() {
        return this.x < -50 || this.x > canvas.width + 50;
    }
}

const keys = {};
const player = new Player();
const enemies = [];
const particles = [];
const projectiles = [];
let score = 0;
let gameOver = false;
let enemySpawnTimer = 0;

class Particle {
    constructor(x, y, color, vx, vy) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.life = 20;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.5;
        this.life--;
    }

    draw() {
        ctx.globalAlpha = this.life / 20;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, PIXEL_SIZE * 2, PIXEL_SIZE * 2);
        ctx.globalAlpha = 1;
    }
}

class Projectile {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 8;
        this.speed = 12;
        this.direction = direction;
        this.frame = 0;
    }

    update() {
        this.x += this.speed * this.direction;
        this.frame++;
    }

    draw() {
        ctx.save();
        
        // Energy ball core
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(this.x - 4, this.y - 4, 8, 8);
        
        // Outer glow
        ctx.fillStyle = '#0088ff';
        ctx.fillRect(this.x - 6, this.y - 2, 12, 4);
        ctx.fillRect(this.x - 2, this.y - 6, 4, 12);
        
        // Trailing effect
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#00ffff';
        for (let i = 1; i < 4; i++) {
            ctx.fillRect(this.x - this.direction * i * 6 - 2, this.y - 2, 4, 4);
        }
        
        // Sparkles
        if (this.frame % 3 === 0) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(this.x + Math.random() * 8 - 4, this.y + Math.random() * 8 - 4, 2, 2);
        }
        
        ctx.restore();
    }

    isOffScreen() {
        return this.x < -50 || this.x > canvas.width + 50;
    }
}

function createHitEffect(x, y) {
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const speed = 2 + Math.random() * 3;
        particles.push(new Particle(
            x,
            y,
            ['#ff0', '#ffa500', '#f00'][Math.floor(Math.random() * 3)],
            Math.cos(angle) * speed,
            Math.sin(angle) * speed - 2
        ));
    }
}

function updateHealthBar() {
    const healthPercent = Math.max(0, player.health / player.maxHealth * 100);
    document.getElementById('healthFill').style.width = healthPercent + '%';
    
    if (healthPercent > 60) {
        document.getElementById('healthFill').style.backgroundColor = '#0f0';
    } else if (healthPercent > 30) {
        document.getElementById('healthFill').style.backgroundColor = '#ff0';
    } else {
        document.getElementById('healthFill').style.backgroundColor = '#f00';
    }
}

function gameLoop() {
    if (gameOver) return;

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(i, 0, 2, canvas.height);
    }
    for (let i = 0; i < canvas.height - 80; i += 40) {
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, i, canvas.width, 2);
    }

    ctx.fillStyle = '#444';
    ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
    ctx.fillStyle = '#555';
    ctx.fillRect(0, canvas.height - 80, canvas.width, 4);

    player.update();

    enemySpawnTimer++;
    if (enemySpawnTimer > 60 + Math.random() * 60) {
        enemies.push(new Enemy(Math.random() < 0.5 ? 'left' : 'right'));
        enemySpawnTimer = 0;
    }

    const attackBox = player.getAttackBox();
    
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.update(player);

        if (attackBox && player.attackType !== 'special') {
            if (enemy.x > attackBox.x && enemy.x < attackBox.x + attackBox.width &&
                enemy.y > attackBox.y && enemy.y < attackBox.y + attackBox.height) {
                enemy.takeDamage(player.attackType === 'special' ? 30 : 20);
                createHitEffect(enemy.x, enemy.y - 20);
            }
        }

        if (enemy.health <= 0) {
            score += enemy.score;
            document.getElementById('score').textContent = score;
            createHitEffect(enemy.x, enemy.y);
            enemies.splice(i, 1);
        } else if (enemy.isOffScreen()) {
            enemies.splice(i, 1);
        }
    }

    // Update and check projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        projectile.update();

        // Check collision with enemies
        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            if (Math.abs(projectile.x - enemy.x) < 20 &&
                Math.abs(projectile.y - enemy.y + 20) < 30) {
                enemy.takeDamage(25);
                createHitEffect(enemy.x, enemy.y - 20);
                projectiles.splice(i, 1);
                break;
            }
        }

        if (projectile.isOffScreen()) {
            projectiles.splice(i, 1);
        }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        if (particle.life <= 0) {
            particles.splice(i, 1);
        }
    }

    player.draw();
    enemies.forEach(enemy => enemy.draw());
    projectiles.forEach(projectile => projectile.draw());
    particles.forEach(particle => particle.draw());

    if (player.health <= 0) {
        gameOver = true;
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('finalScore').textContent = score;
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    if (!gameOver && !player.attacking) {
        if (e.key === 'z' || e.key === 'Z') {
            player.attack('punch');
        } else if (e.key === 'x' || e.key === 'X') {
            player.attack('kick');
        } else if (e.key === 'c' || e.key === 'C') {
            player.attack('special');
        }
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Touch controls
const touchButtons = {
    left: document.getElementById('leftBtn'),
    right: document.getElementById('rightBtn'),
    punch: document.getElementById('punchBtn'),
    kick: document.getElementById('kickBtn'),
    special: document.getElementById('specialBtn')
};

// Movement touch controls
if (touchButtons.left) {
    touchButtons.left.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keys.ArrowLeft = true;
    });
    touchButtons.left.addEventListener('touchend', (e) => {
        e.preventDefault();
        keys.ArrowLeft = false;
    });
}

if (touchButtons.right) {
    touchButtons.right.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keys.ArrowRight = true;
    });
    touchButtons.right.addEventListener('touchend', (e) => {
        e.preventDefault();
        keys.ArrowRight = false;
    });
}

// Attack touch controls
if (touchButtons.punch) {
    touchButtons.punch.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (!gameOver && !player.attacking) {
            player.attack('punch');
        }
    });
}

if (touchButtons.kick) {
    touchButtons.kick.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (!gameOver && !player.attacking) {
            player.attack('kick');
        }
    });
}

if (touchButtons.special) {
    touchButtons.special.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (!gameOver && !player.attacking) {
            player.attack('special');
        }
    });
}

// Prevent scrolling on mobile
document.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Handle window resize for mobile
function resizeCanvas() {
    const container = document.getElementById('gameContainer');
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight - 140; // Leave space for touch controls
    
    if (window.innerWidth <= 768) {
        const scale = Math.min(maxWidth / 800, maxHeight / 400);
        canvas.style.width = (800 * scale) + 'px';
        canvas.style.height = (400 * scale) + 'px';
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

gameLoop();