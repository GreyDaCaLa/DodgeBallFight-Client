import GLOBAL_SETTINGS from "./Constants";


const GS = GLOBAL_SETTINGS



export function movePlayer(playerStatus) {
    let plyin = playerInputs
  // player gravity
  if (true) {
    const btk = GS.mapBorderThinkness;
    const bh = playerStatus.current.boxHeight;
    const botlimit = btk / 2 + bh / 2;
    if (!playerStatus.current.onground) {
      playerStatus.current.vel[1] += GS.WorldConstants.acc[1];
      playerStatus.current.position[1] += playerStatus.current.vel[1];
      if (playerStatus.current.position[1] <= botlimit) {
        playerStatus.current.position[1] = botlimit;
        playerStatus.current.onground = true;
        console.log("Hit the ground");
      }
    }
  }
  if (plyin.jump || plyin.moveDown || plyin.moveLeft || plyin.moveRight) {
    if (plyin.jump && playerStatus.current.onground) {
      playerStatus.current.onground = false;
      playerStatus.current.vel[1] = 0.3;
    }
    if (plyin.moveDown) {
      if (!playerStatus.current.onground) {
        playerStatus.current.position[1] -= GS.WorldConstants.speedVert;
      }
    }
    if (plyin.moveLeft) {
      playerStatus.current.position[0] -= GS.WorldConstants.speedHoz;
      playerStatus.current.rightfacing = false;
    }
    if (plyin.moveRight) {
      playerStatus.current.position[0] += GS.WorldConstants.speedHoz;
      playerStatus.current.rightfacing = true;
    }
  }
  // if (plyin.attack || plyin.inputHolds.current["attack"].tt) {
  //   // console.log(`att-${inputHolds.current['attack'].act} - ${inputHolds.current['attack'].tt}`)
  //   plyin.inputHolds.current["attack"].act = true;

  //   plyin.inputHolds.current["attack"].tt += 1;
  //   if (plyin.inputHolds.current["attack"].tt >= plyin.inputHolds.current["attack"].ps) {
  //     plyin.inputHolds.current["attack"].dn = true;
  //     plyin.inputHolds.current["attack"].tt = 0;
  //     plyin.inputHolds.current["attack"].act = false;
  //   }
  // }
  checkplayerBorderBoundries();
}

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function moveBall(ballstatus) {
  ballstatus.current.oldBallPosition = [...ballstatus.current.position];
  let [x, y, z] = ballstatus.current.position;
  let dir = ballstatus.current.direction;
  let vel = ballstatus.current.scalarVelocity;

  let rad = degToRad(dir);

  let dy = vel * Math.sin(rad);
  let dx = vel * Math.cos(rad);

  let [nx, ny, ndir] = checkBallBorderBoundries(x, y, dx, dy);

  createballPosarray(ballstatus.current.oldBallPosition, [nx, ny, 0]);
  let expected = checkBallandPlayerinteraction([nx, ny, ndir]);
  // console.log(temp)
  nx = expected[0];
  ny = expected[1];
  ndir = expected[2];

  if (!ballstatus.current.ballwashit && !ballstatus.current.hitDelay.act) {
    // console.log([nx, ny, ndir])
    ballstatus.current.position = [nx, ny, z];
    ballstatus.current.direction = ndir;
    ballstatus.current.scalarVelocity = vel;
  } else {
    if (ballstatus.current.ballwashit) {
      ballstatus.current.ballwashitchange = [nx, ny, ndir];
    }
    ballstatus.current.ballwashit = false;
    ballstatus.current.hitDelay.act = true;
    ballstatus.current.hitDelay.tt += 1;
    // console.log(ballstatus.current.hitDelay.tt )

    if (ballstatus.current.hitDelay.tt >= ballstatus.current.hitDelay.pr) {
      ballstatus.current.hitDelay.act = false;
      ballstatus.current.hitDelay.tt = 0;
      ballstatus.current.hitDelay.dn = true;

      expected = ballstatus.current.ballwashitchange;
      // console.log(expected)
      nx = expected[0];
      ny = expected[1];
      ndir = expected[2];

      ballstatus.current.position = [nx, ny, z];
      ballstatus.current.direction = ndir;
      ballstatus.current.scalarVelocity = vel;
    }
  }
}

export function cleanUpdegree(deg) {
  if (deg >= 360) {
    return deg - 360;
  }
  if (deg < 0) {
    return deg + 360;
  }
  return deg;
}

export function calcNewDir(border, dir) {
  let nd = dir;
  if (border == "top") {
    nd = 360 - dir;
    return cleanUpdegree(nd);
  }
  if (border == "bot") {
    nd = 360 - dir;
    return cleanUpdegree(nd);
  }
  if (border == "right") {
    nd = 180 - dir;
    return cleanUpdegree(nd);
  }
  if (border == "left") {
    nd = 180 - dir;
    return cleanUpdegree(nd);
  }

  return dir;
}

export function checkplayerBorderBoundries(playerStatus) {
  const btk = GS.mapBorderThinkness;
  const sw = GS.mapsizeWidth;
  const sh = GS.mapsizeHeight;
  const bw = playerStatus.current.boxWidth;
  const bh = playerStatus.current.boxHeight;
  let leftlimit = btk / 2 + bw / 2;
  let botlimit = btk / 2 + bh / 2;
  let rightlimit = btk / 2 + sw - bw / 2;
  let toplimit = btk / 2 + sh - bh / 2;
  let [x, y, z] = playerStatus.current.position;
  if (x < leftlimit) {
    x = leftlimit;
  }
  if (x > rightlimit) {
    x = rightlimit;
  }
  if (y < botlimit) {
    y = botlimit;
  }
  if (y > toplimit) {
    y = toplimit;
  }

  playerStatus.current.position = [x, y, z];
}

export function checkBallBorderBoundries(x, y, dx, dy , ballstatus) {
  let dir = ballstatus.current.direction;
  let rad = degToRad(dir);
  const btk = GS.mapBorderThinkness;
  const sw = GS.mapsizeWidth;
  const sh = GS.mapsizeHeight;
  const br = ballstatus.current.ballRadius;
  let leftlimit = btk / 2 + br;
  let botlimit = btk / 2 + br;
  let rightlimit = btk / 2 + sw - br;
  let toplimit = btk / 2 + sh - br;

  let wallhitlist = [{ dist: Infinity, dx, dy, dir }];

  if (y + dy > toplimit) {
    let sdy = toplimit - y; // looking for sdx
    let trav_p = sdy / dy; //travel Percentage
    let sdx = trav_p * dx;

    wallhitlist.push({ dist: Math.sqrt(sdx ** 2 + sdy ** 2), dx: sdx, dy: sdy, dir: calcNewDir("top", dir) });
    // // console.log(`I Hit top`);
    // x=x+sdx
    // y=y+sdy

    // //i hit a wall cal new dir
    // dir = calcNewDir("top", dir);
  }
  if (x + dx > rightlimit) {
    let sdx = rightlimit - x; // looking for sdy
    let trav_p = sdx / dx; //travel Percentage
    let sdy = trav_p * dy;

    wallhitlist.push({ dist: Math.sqrt(sdx ** 2 + sdy ** 2), dx: sdx, dy: sdy, dir: calcNewDir("right", dir) });
    // x=x+sdx
    // y=y+sdy
    // // console.log(`I Hit right`);

    // dir = calcNewDir("right", dir);
  }
  if (y + dy < botlimit) {
    let sdy = botlimit - y; // looking for sdx
    let trav_p = sdy / dy; //travel Percentage
    let sdx = trav_p * dx;

    wallhitlist.push({ dist: Math.sqrt(sdx ** 2 + sdy ** 2), dx: sdx, dy: sdy, dir: calcNewDir("bot", dir) });

    // x=x+sdx
    // y=y+sdy

    // dir = calcNewDir("bot", dir);
  }
  if (x + dx < leftlimit) {
    let sdx = leftlimit - x; // looking for sdy
    let trav_p = sdx / dx; //travel Percentage
    let sdy = trav_p * dy;
    // console.log()
    // console.log(`I Hit left`);

    wallhitlist.push({ dist: Math.sqrt(sdx ** 2 + sdy ** 2), dx: sdx, dy: sdy, dir: calcNewDir("left", dir) });

    // x=x+sdx
    // y=y+sdy

    // dir = calcNewDir("left", dir);
  }
  // else {
  //   y += dy;
  //   x += dx;
  // }
  wallhitlist.sort((a, b) => a.dist - b.dist);
  // console.log(wallhitlist)
  let change = wallhitlist[0];

  return [x + change.dx, y + change.dy, change.dir];
}
export function getdist(p1, p2) {
  let [x1, y1, z1] = p1;
  let [x2, y2, z2] = p2;

  let dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return dist;
}
export function calcAngle(s1, s2) {
  // will calc angle of s2 with respects to s1
  let [x1, y1, z1] = s1;
  let [x2, y2, z2] = s2;
  // console.log(Math.atan((y2-y1)/(x2-x1))*(180/Math.PI))

  return Math.atan((y2 - y1) / (x2 - x1)) * (180 / Math.PI);
}

export function createballPosarray(oldpos, currpos, ballstatus) {
  // console.log({oldpos,currpos})
  let [x1, y1, z1] = oldpos;
  let [x2, y2, z2] = currpos;
  let framedist = getdist(oldpos, currpos);
  let span = Math.ceil(framedist / (ballstatus.current.ballRadius * 2));
  let dir = ballstatus.current.direction;
  // console.log({span,oldpos,currpos})
  let ballposarr = [];
  if (span > 1) {
    let spandx = (x2 - x1) / span;
    let spandy = (y2 - y1) / span;
    // console.log({spandx,spandy})
    for (let i = 0; i < span; i++) {
      let nx = x1 + spandx * i;
      let ny = y1 + spandy * i;
      ballposarr.push([nx, ny, 0]);
    }
  }
  // inserting new spot
  ballposarr.push(currpos);
  ballstatus.current.midFrameBallArr = ballposarr;
}

export function ballChangeOnHit(attacktype, angletoball, expectedchange, ballstatus,playerStatus) {
  let ball = ballstatus.current;
  let player = playerStatus.current;
  let [nx, ny, ndir] = expectedchange;

  if (attacktype == "mid") {
    // console.log({angletoball})
    if (Math.abs(angletoball) < 10) {
      // console.log('WIthim in 10')
      ballstatus.current.ballwashit = true;
      // ballstatus.current.ballwashitangle=angletoball
      let ndir = player.rightfacing ? 0 : 180;
      return [nx, ny, ndir];

      // ballwashit = true

      // ballChangeOnHithelper()
      // return
    }
  }

  return expectedchange;
}

export function checkBallandPlayerinteraction(expectedchange,ballstatus,playerStatus,playerInputs) {
    let plyin = playerInputs
  let ballspots = ballstatus.current.midFrameBallArr;
  let player = playerStatus.current;
  let ballwashit = false;
  for (let ballspot of ballspots) {
    let dist = getdist(player.position, ballspot);
    if (dist <= player.relavancyRadius) {
      let angletoball = calcAngle(player.position, ballspot);
      let ballside = ballstatus.current.position[0] - player.position[0];

      if ((ballside >= 0 && player.rightfacing) || (ballside < 0 && !player.rightfacing)) {
        // is the player faceing the ball
        if (plyin.inputHolds.current["attack"].act) {
          // is player wall up
          if (dist < player.wallSpecs.mid) {
            //did ball hit wall
            return ballChangeOnHit("mid", angletoball, expectedchange);
          }
        }
      }

      //did ball hit player
    }
  }
  return expectedchange;
}
