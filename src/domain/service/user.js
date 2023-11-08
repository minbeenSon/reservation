import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
import { redirect } from '@sveltejs/kit';
import { UserRank } from '@prisma/client';

const prisma = new PrismaClient();

/** == CREATE == */
export async function createUser(user) {
    return prisma.user.create({
        data: {
            email: user.email,
            password: bcrypt.hashSync(user.password, 10),
            nickname: user.nickname,
            profile_img_url:
                user.profileImage
                    ? user.profileImage
                    : 'https://image.maho-l.ink/img/98622db2cfe6b6442620f4783f7d35e780550de1798a55fb87f66b3249c4d3ff',
            gender: user.gender,
            birth: user.birth,
            country: user.country,
            user_rank: UserRank.USER,
            created_at: new Date()
        }
    });
}


/** == READ == */
export async function findUserByUserId(userId) {
    return await prisma.user.findUnique({
        where: {
            id: userId,
            deleted_at: null
        }
    });
}

export async function emailDuplication(email) {
    return await prisma.user.findFirst({
        where: {
            email: email
        }
    });
}

export async function findUserByEmailAndPassword(email, password) {
    const user = await prisma.user.findFirst({
        where: {
            email: email,
            deleted_at: null
        }
    })
    if (!bcrypt.compareSync(password, user.password)) {
        return null;
    }
    return user;
}

export async function findUserByCookies(token) {
    if (!token) return null;

    const logInToken = await prisma.login_token.findFirst({
        where: {
            token: token
        }
    });
    if (!logInToken) {
        return null;
    }
    let user = await findUserByUserId(logInToken.user_id);

    return user;
}

export async function findUserList(manager, deleted, searchPart, searchText) {

    let searchParamsAND = [];
    if (manager) {
        searchParamsAND.push({ user_rank: UserRank.MANAGER });
    }
    if (deleted) {
        searchParamsAND.push({ deleted_at: null });
    }

    let searchParamsOR = [];
    if (searchPart !== 'email') {
        searchParamsOR.push({ nickname: { contains: searchText } });
    }
    if (searchPart !== 'nickname') {
        searchParamsOR.push({ email: { contains: searchText } });
    }

    return await prisma.user.findMany({
        where: {
            AND: searchParamsAND,
            OR: searchParamsOR
        },
        orderBy: {
            id: 'desc'
        }
    });
}

export async function findUserListForVote(userIdList) {
    return prisma.user.findMany({
        where: {
            id: {
                in: userIdList
            }
        }
    });
}


/** == UPDATE == */
export async function updateUser(user) {
    let updateParam = {
        password: bcrypt.hashSync(user.password, 10),
        nickname: user.nickname,
        profile_img_url: user.profile_img_url,
        country: user.country,
        gender: user.gender,
        birth: user.birth
    }
    if (!user.password) {
        delete updateParam.password;
    }
    if (!user.profile_img_url) {
        delete updateParam.profile_img_url;
    }
    if (!user.country) {
        delete updateParam.country;
    }
    if (!user.gender) {
        delete updateParam.gender;
    }
    if (!user.birth) {
        delete updateParam.birth
    }

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: updateParam
    })
}

export async function updateUserRank(userId, userRank) {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            user_rank: userRank
        }
    })
}


/** == DELETE == */
export async function deleteUser(userId) {
    await prisma.user.update({
        where: {
            id: parseInt(userId)
        },
        data: {
            deleted_at: new Date()
        }
    })
}

export async function deleteCompletelyUser(userId) {
    await prisma.user.delete({
        where: {
            id: parseInt(userId)
        }
    })
}



/** == ETC == */
export async function checkLoginAndRedirectLoginPage(loginToken, pathName) {
    if (!loginToken) {
        throw redirect(303, '/login?pathname=' + pathName);
    }

    let isLoggedIn = await findUserByCookies(loginToken);
    if (!isLoggedIn) {
        throw redirect(303, '/login?pathname=' + pathName);
    }
}