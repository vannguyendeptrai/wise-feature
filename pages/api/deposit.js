import prisma from "lib/prisma";
import { getDepositsOnSaving, getDepositsOnUser } from "lib/data";

const depositsOnSaving = await getDepositsOnSaving(savingId)

const depositOnUser = await getDepositsOnUser(userId)