import bcrypt from 'bcrypt'
import prisma from '../../lib/prisma'
import { JwtPayload } from '@fastify/jwt'

export interface LoginInput {
  username: string
  password: string
}

export interface ChangePasswordInput {
  oldPassword: string
  newPassword: string
}

export interface UserPayload {
  userId: number
  username: string
}

// 登录验证
export async function loginService(input: LoginInput) {
  const { username, password } = input

  // 查找用户
  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    throw new Error('用户名或密码错误')
  }

  // 验证密码
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw new Error('用户名或密码错误')
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name,
  }
}

// 获取用户信息
export async function getUserService(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      name: true,
    },
  })

  if (!user) {
    throw new Error('用户不存在')
  }

  return user
}

// 修改密码
export async function changePasswordService(userId: number, input: ChangePasswordInput) {
  const { oldPassword, newPassword } = input

  // 获取用户
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('用户不存在')
  }

  // 验证旧密码
  const isValid = await bcrypt.compare(oldPassword, user.password)
  if (!isValid) {
    throw new Error('旧密码错误')
  }

  // 加密新密码
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  // 更新密码
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  })
}

// 创建初始管理员用户
export async function createInitialAdmin() {
  const existingAdmin = await prisma.user.findUnique({
    where: { username: 'admin' },
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        name: '管理员',
      },
    })
    console.log('Initial admin user created: admin / admin123')
  }
}