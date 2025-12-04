// Signal Generation Utilities

export const generateSignal = (type, length = 150, frequency = 0.05, noiseLevel = 0) => {
    const t = Array.from({ length }, (_, i) => i);
    let signal;

    switch (type) {
        case 'sine':
            signal = t.map(i => Math.sin(2 * Math.PI * frequency * i));
            break;
        case 'noise':
            signal = t.map(() => (Math.random() - 0.5) * 2);
            break;
        case 'lorenz':
            signal = generateLorenz(length);
            break;
        case 'drift':
            signal = t.map(i => Math.sin(2 * Math.PI * frequency * i) + i * 0.015);
            break;
        case 'intermittent':
            signal = generateIntermittent(length);
            break;
        case 'rossler':
            signal = generateRossler(length);
            break;
        case 'quasiperiodic':
            signal = t.map(i => Math.sin(2 * Math.PI * 0.05 * i) + Math.sin(2 * Math.PI * 0.05 * 1.414 * i));
            break;
        case 'fmri_healthy':
            signal = t.map(i => Math.sin(0.03 * i) * 0.5 + Math.sin(0.08 * i) * 0.3 + (Math.random() - 0.5) * 0.15);
            break;
        case 'fmri_mci':
            signal = t.map(i => Math.sin(0.03 * i + Math.random() * 0.3) * 0.4 + (Math.random() - 0.5) * 0.5);
            break;
        default:
            signal = t.map(i => Math.sin(2 * Math.PI * frequency * i));
    }

    if (noiseLevel > 0) {
        signal = signal.map(v => v + (Math.random() - 0.5) * 2 * noiseLevel);
    }
    return signal;
};

const generateLorenz = (n) => {
    const sigma = 10, rho = 28, beta = 8 / 3, dt = 0.01;
    let x = 1, y = 1, z = 1;
    const result = [];
    for (let i = 0; i < n * 10; i++) {
        x += sigma * (y - x) * dt;
        y += (x * (rho - z) - y) * dt;
        z += (x * y - beta * z) * dt;
        if (i % 10 === 0) result.push(x);
    }
    const min = Math.min(...result), max = Math.max(...result);
    return result.map(v => (v - min) / (max - min) * 2 - 1);
};

const generateRossler = (n) => {
    const a = 0.2, b = 0.2, c = 5.7, dt = 0.05;
    let x = 1, y = 1, z = 1;
    const result = [];
    // Burn-in
    for (let i = 0; i < 1000; i++) {
        let dx = -y - z;
        let dy = x + a * y;
        let dz = b + z * (x - c);
        x += dx * dt;
        y += dy * dt;
        z += dz * dt;
    }
    // Generate
    for (let i = 0; i < n * 5; i++) {
        let dx = -y - z;
        let dy = x + a * y;
        let dz = b + z * (x - c);
        x += dx * dt;
        y += dy * dt;
        z += dz * dt;
        if (i % 5 === 0) result.push(x);
    }
    const min = Math.min(...result), max = Math.max(...result);
    return result.map(v => (v - min) / (max - min) * 2 - 1);
};

const generateIntermittent = (n) => {
    const result = [];
    let phase = 'laminar', counter = 0;
    for (let i = 0; i < n; i++) {
        if (phase === 'laminar') {
            result.push(0.5 + (Math.random() - 0.5) * 0.05);
            if (++counter > 30 && Math.random() > 0.95) { phase = 'burst'; counter = 0; }
        } else {
            result.push((Math.random() - 0.5) * 2);
            if (++counter > 10 && Math.random() > 0.8) { phase = 'laminar'; counter = 0; }
        }
    }
    return result;
};

export const computeRecurrenceMatrix = (signal, m = 3, tau = 1, threshold = 0.3) => {
    const n = signal.length - (m - 1) * tau;
    if (n <= 0) return { matrix: [], binary: [] };

    const vectors = [];
    for (let i = 0; i < n; i++) {
        const vec = [];
        for (let j = 0; j < m; j++) vec.push(signal[i + j * tau]);
        vectors.push(vec);
    }

    const matrix = [];
    let maxDist = 0;
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            let dist = 0;
            for (let k = 0; k < m; k++) dist += Math.pow(vectors[i][k] - vectors[j][k], 2);
            dist = Math.sqrt(dist);
            row.push(dist);
            if (dist > maxDist) maxDist = dist;
        }
        matrix.push(row);
    }

    const eps = threshold * maxDist * 0.5;
    const binary = matrix.map(row => row.map(d => d <= eps ? 1 : 0));
    return { matrix, binary, maxDist };
};

export const computeRQA = (binary) => {
    const n = binary.length;
    if (n === 0) return { RR: 0, DET: 0, LAM: 0 };

    let recCount = 0;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) recCount += binary[i][j];
    const RR = recCount / (n * n);

    const diagLengths = [];
    for (let k = 1; k < n; k++) {
        let len = 0;
        for (let i = 0; i < n - k; i++) {
            if (binary[i][i + k] === 1) len++;
            else { if (len > 1) diagLengths.push(len); len = 0; }
        }
        if (len > 1) diagLengths.push(len);
    }
    const diagSum = diagLengths.reduce((a, b) => a + b, 0);
    const DET = recCount > 0 ? Math.min(diagSum / recCount, 1) : 0;

    const vertLengths = [];
    for (let j = 0; j < n; j++) {
        let len = 0;
        for (let i = 0; i < n; i++) {
            if (binary[i][j] === 1) len++;
            else { if (len > 1) vertLengths.push(len); len = 0; }
        }
        if (len > 1) vertLengths.push(len);
    }
    const vertSum = vertLengths.reduce((a, b) => a + b, 0);
    const LAM = recCount > 0 ? Math.min(vertSum / recCount, 1) : 0;

    return { RR, DET, LAM };
};
